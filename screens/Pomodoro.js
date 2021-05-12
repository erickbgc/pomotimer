import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Alert, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { SafeAreaProvider } from 'react-native-safe-area-context'

import StartButton from '../components/StartButton';
import ResetButton from '../components/ResetButton';
import TimeButton from '../components/TimeButton';
import MenuButton from '../components/MenuButton';
import Timer from '../components/Timer';

const pomoTimer = (props) => {

    const [descansoTemp, setDescansoTemp] = useState(5 * 60);
    const [pomoTemp, setPomoTemp] = useState(25 * 60);
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
                mode === 'pomodoro' ? "descanso corto" : "pomodoro"
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

    const handleModeChange = () => {
        setRunning(false);
        setTiempoAct(0);
        setDescansoTemp(5 * 60);

        if (mode == 'pomodoro') {
            setMode('descanso corto');
            setPomoTemp(descansoTemp);
            setTiempoResta(descansoTemp * 1000);
        } else {
            setMode('pomodoro');
            setPomoTemp(25 * 60);
            setTiempoResta(pomoTemp * 1000);
        }
    }

    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={mode == 'pomodoro' ? '#e74c3c' : '#686de0'} />
            <View style={mode === 'pomodoro' ? [styles.container] : [styles.container, styles.shortBreakBack]}>
                <SafeAreaProvider style={styles.container.flex}>
                    {/* Toolbar */}
                    <MenuButton {...props} mode={mode} />

                    {/* Temporizador y Call to Action Buttons */}
                    <View style={mode == 'pomodoro' ? styles.content : [styles.content, styles.shortBreakBack]}>

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
                                <TimeButton action={handleModeChange} />
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