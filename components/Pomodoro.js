import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native';

import StartButton from './StartButton';
import ResetButton from './ResetButton';
import TimeButton from './TimeButton';

const useContador = () => {
    const [contador, setContador] = useState(0);

    const incrementar = () => {
        setContador(contador + 1);
    }

    const reset = () => {
        setContador(0);
    }

    return { contador, incrementar, reset };
}

const Timer = (props) => {
    return (
        <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', color: '#fff' }}
        >Number: {props.count}</Text>
    );
}

const pomoTimer = (props) => {

    const [pomo, setPomo] = useState({
        isRunning: false,
        isStopped: true,
        inicialMinutes: 5,
        inicialSeconds: "00",
        endTime: 0
    });

    const empezarTempo = (e) => {
        if (pomo.isStopped) {

            var intervalId = setInterval(() => {
                // if (pomo.inicialMinutes && pomo.inicialSeconds != 0) {
                //     console.log('Primer if');
                //     clearInterval(intervalId);
                // } 

                if (pomo.inicialSeconds == 0) {
                    setPomo({ ...pomo, inicialSeconds: 60 });
                    console.log("Segundo if");
                    console.log("Antes Min: " +pomo.inicialMinutes)
                    console.log("Antes Sec: " +pomo.inicialSeconds)
                    setPomo((prevPomo) => ({
                        ...pomo,
                        inicialMinutes: pomo.inicialMinutes - 1,
                        inicialSeconds: prevPomo.inicialSeconds - 1
                    }));
                    console.log("Despues Min: " +pomo.inicialMinutes)
                    console.log("Despues Sec: " +pomo.inicialSeconds)
                } else if (pomo.inicialSeconds < 60) {
                    console.log("Tercer if");
                    console.log("Antes Min: " +pomo.inicialMinutes)
                    console.log("Antes Sec: " +pomo.inicialSeconds)
                    setPomo((prevPomo) => ({
                        ...pomo,
                        inicialSeconds: prevPomo.inicialSeconds - 1
                    }));
                    console.log("Despues Min: " +pomo.inicialMinutes)
                    console.log("Depues Sec: " +pomo.inicialSeconds)
                }
                
                // if (pomo.inicialSeconds <= 9) {
                //     console.log("Tercer if");
                //     setPomo((prevPomo) => ({
                //         ...pomo,
                //         inicialSeconds: prevPomo.inicialSeconds - 1
                //     }))
                // }

                // setPomo({isRunning: true, isStopped: false});
                // if(pomo.isRunning) {
                //     if(pomo.inicialSeconds <= 0 && pomo.inicialMinutes > 0) {
                //         setPomo({inicialSeconds: 59}); //00:00:59
                //         setPomo((prevPomo) => ({
                //             inicialMinutes: prevPomo.inicialMinutes - 1,
                //             inicialSeconds: prevPomo.inicialSeconds - 1
                //         }))
                //     } if(pomo.inicialSeconds <= 60 && pomo.inicialMinutes == 0) {
                //         setPomo((prevPomo) => ({
                //             inicialSeconds: prevPomo.inicialSeconds - 1
                //         }))
                //     } if(pomo.inicialSeconds == 0 && pomo.inicialMinutes == 0) {
                //         setPomo({isStopped: true, isRunning: false});
                //         clearInterval();
                //     }
                // }   
            }, 1000)
        }
    }

    const { contador, incrementar, reset } = useContador();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={timerStyles.timerBox}>
                <Timer count={contador} />
            </View>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#fff' }}>
                    {'Terminar diseño pomodoro'}
                </Text>
            </View>
            <View style={styles.pomoCont}>
                <View style={styles.buttonsCont}>
                    <TimeButton />
                    <StartButton action={empezarTempo} />
                    <ResetButton action={reset} />
                </View>
            </View>
            <View>
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
                    {
                        pomo.inicialSeconds == 60 ? pomo.inicialMinutes + " : " + "00" : pomo.inicialMinutes + " : " + pomo.inicialSeconds
                    }
                </Text>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>
                    {pomo.inicialMinutes}
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