import React from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const handleViewPlatform = (props) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
        return (
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
    } else if (Platform.OS === 'web') {
        return (
            <TouchableOpacity
                onPress={props.action}
                background='#bdc3c7'
                style={styles.mrl_5}
            >
                <View style={[styles.startBtn, styles.mrl_5]}>
                    <Text style={styles.btnText}>
                        {props.tooltip}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
};

const startButton = (props) => (
    handleViewPlatform(props)
)

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