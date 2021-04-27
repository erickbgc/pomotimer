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
    return (
        <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', color: '#fff' }}
        >{props.count}</Text>
    );
}

const pomoTimer = (props) => {

    const estadoInicial = {
        isRunning: false,
        isStopped: true,
        inicialMinutes: 5,
        inicialSeconds: "00",
        endTime: 0
    }

    useEffect(() => {
        if(pomo.isStopped) {
            let tempoID = setInterval(() => {

                setPomo({...pomo, inicialSeconds: 60, isStopped: false})

                clearInterval(tempoID);

            }, 1000)
        }
        console.log(pomo)
    }, [pomo])

    const [pomo, setPomo] = useState(estadoInicial);

    const empezarTempo = () => {console.log(pomo)}

    const { contador, incrementar, reset } = useContador();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={timerStyles.timerBox}>
                <Timer count={'25 : 00'} />
            </View>
            <View style={{marginTop: 10, marginBottom: 40}}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                    {'Terminar diseño pomodoro'}
                </Text>
            </View>
            <View style={styles.pomoCont}>
                <View style={styles.buttonsCont}>
                    <TimeButton />
                    <StartButton action={incrementar} />
                    <ResetButton action={reset} />
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