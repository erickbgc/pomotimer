import React, { useState } from 'react';
import { Text, View, TouchableNativeFeedback, Alert, StyleSheet } from 'react-native';

// import useContador from './Pomodoro'; 

const startButton = (props) => {

    // const { contador, incrementar } = useContador();

    return(
        <TouchableNativeFeedback
            onPress={props.action}
            background={TouchableNativeFeedback.Ripple('#bdc3c7')}
            style={styles.mrl_5}
            >
            <View style={[styles.startBtn, styles.mrl_5]}>
                <Text style={styles.btnText}>
                    {props.tooltip}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    startBtn: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        width: 150,
        height: 50
    },
    btnText: {
        fontSize: 21,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: "#707070"
    },
    mrl_5: {
        marginLeft: 5,
        marginRight: 5
    }
})

export default startButton;