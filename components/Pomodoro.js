import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

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

    const {contador, incrementar, reset} = useContador();

    const number = 5;

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
                    <StartButton action={incrementar} />
                    <ResetButton action={reset} />
                </View>
            </View>
            <View>
                <Text>
                    {contador}
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