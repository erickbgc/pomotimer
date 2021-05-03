import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import StartButton from './StartButton';
import ResetButton from './ResetButton';
import TimeButton from './TimeButton';
import Timer from './Timer';

// Task Component
import Tasks from './Tasks';

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
            Alert.alert("Se acabo el tiempo!");

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
            <StatusBar barStyle={'light-content'} backgroundColor="#e74c3c"  />
            <SafeAreaView style={
                mode == 'pomodoro' ?
                    styles.mainContainer :
                    [styles.mainContainer, styles.shortBreakBack]}
            >
                {/* Pomodoro Modes */}
                <View style={timerStyles.timerBox}>
                    <Timer time={tiempoResta} mode={mode} />
                </View>

                {/* Actual Tasks */}
                <View style={{ marginTop: 10, marginBottom: 40 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                        {'Terminar diseño pomodoro'}
                    </Text>
                </View>

                {/* Pomodoro Buttons */}
                <View style={
                    mode == 'pomodoro' ?
                        styles.pomoCont :
                        [styles.pomoCont, styles.shortBreakBack]}
                >
                    <View style={styles.buttonsCont}>
                        <TimeButton />
                        <StartButton action={toggleisRunning} tooltip={isRunning ? "Pause" : "Start"} />
                        <ResetButton action={resetPomo} />
                    </View>
                </View>

                {/* Tareas View */}
                {/* <ScrollView>
                <View>
                    <Tasks tasks={tareas} />
                    <Text>{tiempoResta}</Text>
                </View>
                <View>
                    <Tasks tasks={tareas} />
                    <Text>{tiempoResta}</Text>
                </View>
                <View>
                    <Tasks tasks={tareas} />
                    <Text>{tiempoResta}</Text>
                </View>
                <View>
                    <Tasks tasks={tareas} />
                    <Text>{tiempoResta}</Text>
                </View>
            </ScrollView> */}

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pomoCont: {
        backgroundColor: '#e74c3c',
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
    },
    mrl_5: {
        marginLeft: 5,
        marginRight: 5
    }
});

const timerStyles = StyleSheet.create({
    timerBox: {
        backgroundColor: "rgba(112, 112, 112, 0.5)",
        borderColor: "rgba(112, 112, 112, 0.5)",
        borderRadius: 8,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
    },
});

const nav = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#fff'
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight: '500'
    }
})

export default pomoTimer;