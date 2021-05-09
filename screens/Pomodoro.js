import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Alert, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { SafeAreaProvider } from 'react-native-safe-area-context'

import StartButton from '../components/StartButton';
import ResetButton from '../components/ResetButton';
import TimeButton from '../components/TimeButton';
import Timer from '../components/Timer';

// Task Component
import Tasks from '../components/Tasks';

import tasks from '../samples/tasks.json';

const tasksFunction = () => {
    const [tareas, setTareas] = useState(tasks);


    return { tareas, setTareas }
}

const pomoTimer = (props) => {

    // Tareas
    const { tareas, setTareas } = tasksFunction();

    const [descansoTemp, setDescansoTemp] = useState(5 * 60);
    const [pomoTemp, setPomoTemp] = useState(1 * 60);
    const [mode, setMode] = useState('pomodoro');
    const [tiempoResta, setTiempoResta] = useState();
    const [isRunning, setRunning] = useState(false);
    const [tiempoAct, setTiempoAct] = useState(0);

    useEffect(() => {
        // Mostrara el tiempo restante segun el modo en el que nos encontremos
        setTiempoResta(mode === 'pomodoro' ? pomoTemp * 1000 : descansoTemp * 1000);
    }, [pomoTemp, descansoTemp]);

    useEffect(() => {
        let tempoID = null;

        if (isRunning && tiempoResta > 1) {
            setTiempoResta(
                mode === 'pomodoro' ? pomoTemp * 1000 - tiempoAct : descansoTemp * 1000 - tiempoAct
            );

            // Se suma el segundo de ejecucion de la funcion setInterval
            tempoID = setInterval(() => {
                setTiempoAct((tiempoAct) => tiempoAct + 1000)
            }, 1000);

        } else {
            clearInterval(tempoID);
        }

        // Trivial case
        if (tiempoResta === 0) {
            setTiempoAct(0);
            if (Platform.OS === 'android') {
                Alert.alert("Se acabo el tiempo!");
            } else if (Platform.OS === 'web') {
                alert("Se acabo de tiempo!")
            }

            setMode((mode) => (
                mode == 'pomodoro' ? "descaso" : "pomodoro"
            ));

            setTiempoResta(
                mode === "pomodoro" ? pomoTemp * 1000 : descansoTemp * 1000
            );
        }

        return () => clearInterval(tempoID);
    }, [isRunning, tiempoAct]);

    const resetPomo = () => {
        setDescansoTemp(5 * 60);
        setPomoTemp(25 * 60);
        setTiempoResta(mode == "pomodoro" ? pomoTemp * 1000 : descansoTemp * 1000);

        if (isRunning || !isRunning) {
            setRunning(false);
            setTiempoAct(0);
        }
    }

    const toggleisRunning = () => {
        setRunning(!isRunning);
    }

    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={mode === 'pomodoro' ? "#e74c3c" : "#686de0"} />
            <View style={mode === 'pomodoro' ? [styles.container] : [styles.container, styles.shortBreakBack]}>
                <SafeAreaProvider style={styles.container.flex}>
                    {/* Toolbar */}
                    <View style={styles.toolbar}>
                        <TouchableOpacity
                            style={{ margin: 16 }}
                            onPress={() => props.navigation.toggleDrawer()}>
                            <FontAwesome5 name="bars" size={24} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.toolbarMode}>
                            <Text style={styles.toolbarModeText}>
                                {mode.toString().toUpperCase()}
                            </Text>
                        </View>
                    </View>

                    {/* Temporizador y Call to Action Buttons */}
                    <View style={styles.content}>

                        {/* temporizador y tarea actual */}
                        <View style={{ marginBottom: -150 }}>
                            <Timer time={tiempoResta} mode={mode} />
                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 40 }}>
                                {'Terminar diseño pomodoro'}
                            </Text>
                        </View>

                        {/* CTA Buttons */}
                        <View style={
                            mode == 'pomodoro' ?
                                styles.pomoCont :
                                [styles.pomoCont, styles.shortBreakBack]
                        }>
                            <View style={styles.buttonsCont}>
                                <TimeButton />
                                <StartButton action={toggleisRunning} tooltip={isRunning ? "Pause" : "Start"} />
                                <ResetButton action={resetPomo} />
                            </View>
                        </View>
                    </View>
                </SafeAreaProvider>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e74c3c'
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    toolbarMode: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbarModeText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        backgroundColor: '#e74c3c',
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
    buttonsCont: {
        flexDirection: 'row',
        width: '100%',
    }
});

export default pomoTimer;