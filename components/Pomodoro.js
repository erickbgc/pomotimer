import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native';

import StartButton from './StartButton';
import ResetButton from './ResetButton';
import TimeButton from './TimeButton';

const useContador = () => {
    const [contador, setContador] = useState(0);

    const incrementar = () => {
        setContador(contador + 1);
        console.log(contador)
    }

    const reset = () => {
        setContador(0);
    }

    return { contador, incrementar, reset };
}

const Timer = (props) => {

    const {time, mode} = props;

    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);

    return (
        <>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff', fontFamily: 'sans-serif' }}>
                {mode.toString().toUpperCase()}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', color: '#fff' }}>
                {minutes} : {seconds.toString().length === 1 ? "0" + seconds : seconds}
            </Text>
        </>
    );
}

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

        if(isRunning && tiempoResta > 1) {
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
        if(tiempoResta === 0) {
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

        if (isRunning) {
            setRunning(false);
            setTiempoAct(0);
        }
    }

    const toggleisRunning = () => {
        setRunning(!isRunning);
    }

    const { contador, incrementar, reset } = useContador();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={timerStyles.timerBox}>
                <Timer time={tiempoResta} mode={mode} />
            </View>
            <View style={{marginTop: 10, marginBottom: 40}}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                    {'Terminar diseño pomodoro'}
                </Text>
            </View>
            <View style={styles.pomoCont}>
                <View style={styles.buttonsCont}>
                    <TimeButton />
                    <StartButton action={toggleisRunning} tooltip={isRunning ? "Pause" : "Start"} />
                    <ResetButton action={resetPomo} />
                </View>
            </View>
            <View>
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
                    {/* {
                        pomo.inicialSeconds == 60 ? pomo.inicialMinutes + " : " + "00" : pomo.inicialMinutes + " : " + pomo.inicialSeconds
                    } */}
                </Text>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>
                    {/* {pomo.inicialMinutes} */}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
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
})

export default pomoTimer;