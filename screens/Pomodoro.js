import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import { SafeAreaProvider } from 'react-native-safe-area-context'

import StartButton from '../components/StartButton';
import ResetButton from '../components/ResetButton';
import TimeButton from '../components/TimeButton';
import MenuButton from '../components/MenuButton';
import Timer from '../components/Timer';

import firebase from '../database/firebase';

const pomoTimer = (props) => {

    // Styles
    const [theme, setTheme] = useState({
        flex: 1,
        backgroundColor: '#e74c3c'
    })

    const initialState = {
        id: "",
        title: '',
        description: '',
        pomodoros: 1,
        done: false,
        createdAt: '',
        modifiedAt: '',
    }

    const defaultMode = 'pomodoro';

    const defaultTempos = {
        pomodoros: 25 * 60,
        descansosCortos: 5 * 60,
        descansosLargos: 15 * 60
    }

    // Contador para los descansos largos
    const [contadorDescansosLargos, setContadorDescansosLargos] = useState(0);

    // Tareas
    const [tareas, setTareas] = useState(initialState);
    const [bloquesDetiempo, setBloquesDeTiempo] = useState(999);

    // Recuperando valores de la tarea actual
    // const [tareaTemp, setTareaTemp] = useState(initialState);

    // Loader
    const [loading, setLoading] = useState(true);

    // Contador de Bloques
    const [contadorDeBloque, setContadorDeBloques] = useState(0);

    // Estados del pomodoro
    const [pomoTemp, setPomoTemp] = useState(defaultTempos.pomodoros);
    const [descansoTemp, setDescansoTemp] = useState(defaultTempos.descansosCortos);
    const [longbreak, setLongBreak] = useState(defaultTempos.descansosLargos);
    const [mode, setMode] = useState(defaultMode);
    const [tiempoResta, setTiempoResta] = useState();
    const [isRunning, setRunning] = useState(false);
    const [tiempoAct, setTiempoAct] = useState(0);

    // Estados para la configuracion de los pomodoros
    const [customPomo, setCustomPomo] = useState('');
    const [customDesCorto, setCustomDesCorto] = useState('');
    const [customDesLargo, setCustomDesLargo] = useState('');

    // Parametros desde la pantalla de configuracion
    useEffect(() => {
        if (props.route.params?.cambios) {
            // *** Saving state in customs Tempos ***
            setCustomPomo(props.route.params?.customPomo);
            setCustomDesCorto(props.route.params?.descansosCortos);
            setCustomDesLargo(props.route.params?.descansosLargos);
            // *** END - Saving state in customs Tempos ***

            // *** Updating state on current tempos ***
            setPomoTemp(props.route.params?.customPomo);
            setDescansoTemp(props.route.params?.descansosCortos);
            setLongBreak(props.route.params?.descansosLargos);
            // *** END - Updating state on current tempos ***
            // setContadorDeBloques(0);
            // setContadorDescansosLargos(0);
            // setTiempoAct(0);
        }
    }, [
        props.route.params?.cambios,
        props.route.params?.customPomo,
        props.route.params?.descansosCortos,
        props.route.params?.descansosLargos
    ]
    )

    // Llamada a la BD
    useEffect(() => {

        firebase.database.collection('tareas').onSnapshot(querySnapshot => {

            const tasks = [];
            let bloques = 1;

            querySnapshot.docs.forEach(doc => {
                const { title, description, pomodoros, createdAt, done, active, modifiedAt } = doc.data();

                if (active) {

                    tasks.push({
                        id: doc.id,
                        title,
                        description,
                        pomodoros,
                        createdAt,
                        modifiedAt: modifiedAt || '',
                        active,
                        done
                    })

                    bloques = pomodoros;
                }

            });

            try {
                if (tasks.length > 0) {
                    setTareas(tasks[0]);
                    setBloquesDeTiempo(bloques);
                    setLoading(false);
                } else {
                    setTareas(initialState);
                    setBloquesDeTiempo(999);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        });
    }, []);

    // console.log(bloquesDetiempo);

    // Actualizacion de Tiempo Restante
    useEffect(() => {
        // Mostrara el tiempo restante segun el modo en el que nos encontremos
        if (mode == 'pomodoro') {
            setTiempoResta(pomoTemp * 1000);
        } else if (mode == 'descanso corto') {
            setTiempoResta(descansoTemp * 1000);
        } else if (mode == 'descanso largo') {
            setTiempoResta(longbreak * 1000);
        }
    }, [pomoTemp, descansoTemp]);

    // Temporizador
    useEffect(() => {
        let tempoID = null;

        if (isRunning && tiempoResta > 1) {

            if (mode == 'pomodoro') {
                setTiempoResta(pomoTemp * 1000 - tiempoAct);
            } else if (mode == 'descanso corto') {
                setTiempoResta(descansoTemp * 1000 - tiempoAct);
            } else if (mode == 'descanso largo') {
                setTiempoResta(longbreak * 1000 - tiempoAct);
            }

            // Se suma el segundo de ejecucion de la funcion setInterval
            tempoID = setInterval(() => {
                setTiempoAct((tiempoAct) => tiempoAct + 1000)
            }, 1000);

        } else {
            clearInterval(tempoID);
        }

        // Trivial case
        if (tiempoResta === 0 && bloquesDetiempo <= 1) {
            setTiempoAct(0);
            if (mode == 'pomodoro') {

                if (tareas.title != '' && !tareas.done) {
                    checkDoneTarea();
                    console.log("La tarea ha terminado");
                    resetDefaultState();
                    clearInterval(tempoID);
                } else {
                    resetDefaultState();
                    clearInterval(tempoID);
                }

                setMode('descanso corto');
                setPomoTemp(descansoTemp);
                setTiempoResta(descansoTemp * 1000);
                setTheme({
                    flex: 1,
                    backgroundColor: '#e74c3c'
                });
            }
        } else if (tiempoResta === 0 && bloquesDetiempo > 1) {

            if (contadorDeBloque < bloquesDetiempo) {
                setTiempoAct(0);
                // Si el modo es igual a pomodoro entonces ...
                if (mode == 'pomodoro') {
                    // Contador
                    setContadorDeBloques(contadorDeBloque + 1);
                    // POMODOROS
                    if (contadorDescansosLargos < 2) {
                        setMode('descanso corto');
                        setPomoTemp(descansoTemp);
                        setTiempoResta(descansoTemp * 1000);
                        setContadorDescansosLargos(contadorDescansosLargos + 1);
                        setTheme({
                            flex: 1,
                            backgroundColor: '#686de0'
                        });
                        setRunning(false);
                        clearInterval(tempoID);
                    } else if (contadorDescansosLargos >= 2) {
                        setMode('descanso largo');
                        setPomoTemp(longbreak);
                        setTiempoResta(longbreak * 1000);
                        setTheme({
                            flex: 1,
                            backgroundColor: '#218c74'
                        });
                        setRunning(false);
                        clearInterval(tempoID);
                    }
                    // END - POMODOROS
                } else if (mode == 'descanso corto') {
                    setMode(defaultMode);
                    setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
                    setTiempoResta(pomoTemp * 1000);
                    setTheme({
                        flex: 1,
                        backgroundColor: '#e74c3c'
                    });
                    setRunning(false);
                    clearInterval(tempoID);
                } else if (mode == 'descanso largo') {
                    // Alerta
                    // Platform.OS != 'web' ? Alert.alert('Tiempo de trabajar') : alert('Tiempo de trabajar');
                    setMode(defaultMode);
                    setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
                    setTiempoResta(pomoTemp * 1000);
                    setTheme({
                        flex: 1,
                        backgroundColor: '#e74c3c'
                    });
                    setRunning(false);
                    clearInterval(tempoID);
                }
            } else if (tiempoResta == 0 && contadorDeBloque >= bloquesDetiempo) {
                if (tareas.title != '' && !tareas.done) {
                    checkDoneTarea();
                    console.log("La tarea ha terminado");
                    resetDefaultState();
                    clearInterval(tempoID);
                } else {
                    resetDefaultState();
                    clearInterval(tempoID);
                }
            }

        }

        return () => clearInterval(tempoID);
    }, [isRunning, tiempoAct]);

    console.log(tareas.title);
    console.log(contadorDeBloque);

    // Consulta a la DB sobre el ID que de la tarea actual
    // const getTaskById = async id => {
    //     const dbRef = firebase.database.collection('tareas').doc(id);
    //     const doc = await dbRef.get();
    //     const task = doc.data();
    //     setTareaTemp({
    //         ...task,
    //         id: doc.id,
    //     });
    // }

    // Loader, se ejecuta cuando los datos de la BD estan siendo procesados
    if (loading) {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    const checkDoneTarea = async () => {
        const dbRef = firebase.database.collection('tareas').doc(tareas.id);
        await dbRef.update({
            done: true,
            active: false,
            modifiedAt: new Date()
        });
    }

    const resetDefaultState = () => {
        setRunning(false);
        setTiempoAct(0);
        setMode('pomodoro');
        setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
        setTiempoResta(pomoTemp * 1000);
        setContadorDescansosLargos(0);
        setContadorDeBloques(0);
        setBloquesDeTiempo(999);
        setTheme({
            flex: 1,
            backgroundColor: '#e74c3c'
        });
    }

    const resetPomo = () => {
        setTiempoAct(0);
        setRunning(false);
        setContadorDeBloques(0);
        setContadorDescansosLargos(0);

        console.log(mode)

        switch (mode) {
            case 'pomodoro':
                setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
                setTiempoResta(pomoTemp * 1000);
                break;
            case 'descanso corto':
                setPomoTemp(customDesCorto == '' || customDesCorto == undefined ? defaultTempos.descansosCortos : customPomo);
                setTiempoResta(descansoTemp * 1000);
                break;
            case 'descanso largo':
                setPomoTemp(customDesLargo == '' || customDesLargo == undefined ? defaultTempos.descansosLargos : customDesLargo);
                setTiempoResta(longbreak * 1000);
                break;
            default:
                break;
        }
    }

    const toggleisRunning = () => {
        setRunning(!isRunning);
    }

    const handleModeChange = () => {
        setTiempoAct(0);
        setRunning(false);
        setContadorDeBloques(0);
        setContadorDescansosLargos(0);

        switch (mode) {
            case 'pomodoro':
                setMode('descanso corto');
                setPomoTemp(customDesCorto == '' || customDesCorto == undefined ? defaultTempos.descansosCortos : customPomo);
                setTiempoResta(descansoTemp * 1000);
                setTheme({
                    flex: 1,
                    backgroundColor: '#686de0'
                });
                break;
            case 'descanso corto':
                setMode('descanso largo');
                setPomoTemp(customDesLargo == '' || customDesLargo == undefined ? defaultTempos.descansosLargos : customDesLargo);
                setTiempoResta(longbreak * 1000);
                setTheme({
                    flex: 1,
                    backgroundColor: '#218c74'
                });
                break;
            case 'descanso largo':
                setMode('pomodoro');
                setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
                setTiempoResta(pomoTemp * 1000);
                setTheme({
                    flex: 1,
                    backgroundColor: '#e74c3c'
                });
                break;
            default:
                break;
        }
    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.backgroundColor} />
            <View style={theme}>
                <SafeAreaProvider style={{ flex: 1 }}>
                    {/* Toolbar */}
                    <MenuButton {...props} mode={mode} color={theme.backgroundColor} />

                    {/* Temporizador y Call to Action Buttons */}
                    <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
                        {/* temporizador y tarea actual */}
                        <View style={{ marginBottom: -150 }}>
                            <Timer time={tiempoResta} mode={mode} />

                            {
                                !tareas.done && tareas.title != '' &&
                                <>
                                    <Text
                                        key={tareas.id}
                                        style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 40 }}
                                    >
                                        {tareas.title}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <FontAwesome5 name="stopwatch" size={12} color="#fff" />
                                        &nbsp;
                                        {contadorDeBloque}
                                        /
                                        {tareas.pomodoros}
                                    </Text>
                                </>
                            }
                        </View>
                        {/* <Button
                            onPress={skipTime}
                            title='Skip Time'
                        /> */}

                        {/* CTA Buttons */}
                        <View style={[styles.pomoCont, { marginBottom: -50 }]}>
                            <View style={styles.buttonsCont}>
                                <TimeButton action={handleModeChange} />
                                <StartButton action={toggleisRunning} tooltip={isRunning ? "Pause" : "Start"} />
                                <ResetButton action={resetPomo} />
                            </View>
                        </View>

                        {/* Pantalla de configuracion router */}
                        <View>
                            <View style={{ padding: 15, backgroundColor: 'rgba(75, 75, 75,0.7)', borderRadius: 5 }}>
                                <Text
                                    onPress={() => props.navigation.push('Configuracion', {
                                        theme: theme,
                                        customPomo: customPomo / 60 || defaultTempos.pomodoros / 60,
                                        descansosCortos: descansoTemp / 60,
                                        descansosLargos: longbreak / 60,
                                        cambios: false,
                                    })}
                                    style={{ fontWeight: 'bold', color: 'white', fontSize: 14, textTransform: 'uppercase' }}
                                >
                                    Configuracion
                                </Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaProvider>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    pomoCont: {
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        padding: 10,
    },
    shortBreakBack: {
        backgroundColor: '#686de0',
    },
    longbreak: {
        backgroundColor: 'rgba(33, 140, 116,1.0)',
    },
    buttonsCont: {
        flexDirection: 'row',
        width: '100%',
    }
});

export default pomoTimer;