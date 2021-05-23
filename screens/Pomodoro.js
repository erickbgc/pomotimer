import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Alert,
    Button,
    Platform,
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
    const [tareas, setTareas] = useState([]);
    const [bloquesDetiempo, setBloquesDeTiempo] = useState(1);
    const [tareaActualId, setTareaActualId] = useState('');
    var bloquesTemp = 1;

    // Recuperando valores de la tarea actual
    const [tareaTemp, setTareaTemp] = useState(initialState);

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
            setCustomPomo(props.route.params?.pomodoros);
            setCustomDesCorto(props.route.params?.descansosCortos);
            setCustomDesLargo(props.route.params?.descansosLargos);
            // *** END - Saving state in customs Tempos ***

            // *** Updating state on current tempos ***
            setPomoTemp(props.route.params?.pomodoros);
            setDescansoTemp(props.route.params?.descansosCortos);
            setLongBreak(props.route.params?.descansosLargos);
            // *** END - Updating state on current tempos ***
        }
    }, [props.route.params?.cambios]
    )

    // Llamada a la BD
    useEffect(() => {

        firebase.database.collection('tareas').onSnapshot(querySnapshot => {

            const tasks = [];
            const lastTask = [];
            let lastTaskId = '';
            let bloques = 0;

            querySnapshot.docs.forEach(doc => {
                const { title, description, pomodoros, createdAt, done } = doc.data();
                tasks.push({
                    id: doc.id,
                    title,
                    description,
                    pomodoros,
                    createdAt,
                    done
                });
            });

            try {
                if (tasks.length > 0) {
                    setTareas(tasks);

                    lastTask.push(tasks[tasks.length - 1]);

                    lastTask.forEach((val) => {
                        bloques = val.pomodoros;
                        lastTaskId = val.id;
                    })

                    setTareaActualId(lastTaskId);
                    setBloquesDeTiempo(bloques);
                    bloquesTemp = bloquesDetiempo;
                    rondas = bloquesTemp * 2;
                    setLoading(false);
                    // setTareaActual([tasks[tasks.length - 1]]);
                }
            } catch (error) {
                console.log(error.message);
            }
        });
    }, []);

    useEffect(() => {
        if (tareaActualId !== '') {
            getTaskById(tareaActualId);
        }
    }, [tareaActualId]);

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
        if (tiempoResta === 0 && contadorDeBloque < bloquesDetiempo) {
            setTiempoAct(0);
            // Si el modo es igual a pomodoro entonces ...
            if (mode == 'pomodoro') {
                if (contadorDescansosLargos < 2) {
                    // Alerta
                    // Platform.OS != 'web' ? Alert.alert('Tiempo de descansar') : alert('Tiempo de descansar');
                    setMode('descanso corto');
                    setPomoTemp(descansoTemp);
                    console.log("Dentro del tiempo descanso corto: ", pomoTemp);
                    setTiempoResta(descansoTemp * 1000);
                    setContadorDeBloques(contadorDeBloque + 1);
                    setContadorDescansosLargos(contadorDescansosLargos + 1);
                    setTheme({
                        flex: 1,
                        backgroundColor: '#686de0'
                    });
                    setRunning(false);
                    clearInterval(tempoID);
                } else if (contadorDescansosLargos >= 2) {
                    // Alerta
                    // Platform.OS != 'web' ? Alert.alert('Tiempo de descansar') : alert('Tiempo de descansar');
                    setMode('descanso largo');
                    setPomoTemp(longbreak);
                    setTiempoResta(longbreak * 1000);
                    setContadorDescansosLargos(0);
                    setTheme({
                        flex: 1,
                        backgroundColor: '#218c74'
                    });
                    setRunning(false);
                    clearInterval(tempoID);
                }
            } else if (mode == 'descanso corto') {
                // Alerta
                // Platform.OS != 'web' ? Alert.alert('Tiempo de trabajar') : alert('Tiempo de trabajar');
                setMode(defaultMode);
                console.log("Dentro del tiempo pomodoro: ", pomoTemp);
                setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
                setTiempoResta(pomoTemp * 1000);
                setContadorDeBloques(contadorDeBloque + 1);
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
                setContadorDeBloques(contadorDeBloque + 1);
                setTheme({
                    flex: 1,
                    backgroundColor: '#e74c3c'
                });
                setRunning(false);
                clearInterval(tempoID);
            }

        } else if (tiempoResta === 0 && contadorDeBloque >= bloquesDetiempo) {
            resetDefaultState();
            if (!tareaTemp.done) {
                checkDoneTarea();
            }
            // Hay que comprobar si la tarea a terminado, para que el temporizador
            // no se detenga si es que no tenemos tareas
            setTareaTemp(initialState);
            console.log("La tarea a terminado");
            clearInterval(tempoID);
        }

        return () => clearInterval(tempoID);
    }, [isRunning, tiempoAct]);

    console.log("Pomodoro: ", pomoTemp);

    // Only Works when time is running
    const skipTime = () => {
        let descansosLargos = 0
        if (isRunning) {
            if (contadorDeBloque < bloquesDetiempo) {
                setRunning(false);
                setTiempoAct(0);
                setDescansoTemp(5 * 60);
                setPomoTemp(25 * 60);
                setLongBreak(15 * 60)

                if (mode == 'pomodoro') {
                    setMode('descanso corto');
                    setPomoTemp(descansoTemp);
                    setTiempoResta(descansoTemp * 1000);
                    descansosLargos++;
                } else if (mode == 'descanso corto' && descansosLargos > bloquesDetiempo) {
                    setMode('pomodoro');
                    setPomoTemp(pomoTemp);
                    setTiempoResta(pomoTemp * 1000);
                } else if (mode == 'descanso corto' && descansosLargos > 2) {
                    setMode('descanso largo');
                    setPomoTemp(longbreak);
                    setTiempoResta(longbreak * 1000)
                    descansosLargos = 0;
                } else if (mode == 'descanso largo') {
                    setMode('pomodoro');
                    setPomoTemp(pomoTemp);
                    setTiempoResta(pomoTemp * 1000);
                }

                setContadorDeBloques(contadorDeBloque + 1);
            } else if (contadorDeBloque >= rondas) {
                handleModeChange();
                checkDoneTarea();
                console.log("La tarea a terminado");
            }
        } else {
            alert('Time is not running!');
        }
    }

    // Consulta a la DB sobre el ID que de la tarea actual
    const getTaskById = async id => {
        const dbRef = firebase.database.collection('tareas').doc(id);
        const doc = await dbRef.get();
        const task = doc.data();
        setTareaTemp({
            ...task,
            id: doc.id,
        });
    }

    // Loader, se ejecuta cuando los datos de la BD estan siendo procesados
    if (loading) {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    const checkDoneTarea = async () => {
        const dbRef = firebase.database.collection('tareas').doc(tareaTemp.id);
        await dbRef.update({
            done: true
        });
        // if(tareas.length > 0) {
        //     setTareaTemp(tareas[tareas.length] - 1);
        // } else {
        //     setTareaTemp({ ...tareaTemp, done: true });
        // }
        setTareaTemp({ ...tareaTemp, done: true });
        console.log('done');
    }

    const resetDefaultState = () => {
        setRunning(false);
        setTiempoAct(0);
        setMode('pomodoro')
        setPomoTemp(customPomo == '' || customPomo == undefined ? defaultTempos.pomodoros : customPomo);
        setTiempoResta(pomoTemp * 1000);
        setContadorDescansosLargos(0);
        setContadorDeBloques(0);
    }

    const resetPomo = () => {
        setTiempoAct(0);
        setRunning(false);
        setPomoTemp(pomoTemp);
        setContadorDeBloques(0);
        setContadorDescansosLargos(0);

        switch (mode) {
            case 'pomodoro':
                setTiempoResta(pomoTemp * 1000);
                break;
            case 'descanso corto':
                setTiempoResta(descansoTemp * 1000);
                break;
            case 'descanso largo':
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
        setPomoTemp(pomoTemp);
        setContadorDeBloques(0);
        setContadorDescansosLargos(0);

        switch (mode) {
            case 'pomodoro':
                setMode('descanso corto');
                setTiempoResta(descansoTemp * 1000);
                setTheme({
                    flex: 1,
                    backgroundColor: '#686de0'
                });
                break;
            case 'descanso corto':
                setMode('descanso largo');
                setTiempoResta(longbreak * 1000);
                setTheme({
                    flex: 1,
                    backgroundColor: '#218c74'
                });
                break;
            case 'descanso largo':
                setMode('pomodoro');
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
                                !tareaTemp.done &&
                                <>
                                    <Text
                                        key={tareaTemp.id}
                                        style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 40 }}
                                    >
                                        {tareaTemp.title}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <FontAwesome5 name="stopwatch" size={12} color="#fff" />
                                        &nbsp;
                                        {contadorDeBloque}
                                        /
                                        {tareaTemp.pomodoros}
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
                            <View style={{padding: 15, backgroundColor: 'rgba(75, 75, 75,0.7)', borderRadius: 5}}>
                                <Text
                                    onPress={() => props.navigation.push('Configuracion', {
                                        theme: theme,
                                        cambios: false,
                                        pomodoros: pomoTemp / 60,
                                        descansosCortos: descansoTemp / 60,
                                        descansosLargos: longbreak / 60
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