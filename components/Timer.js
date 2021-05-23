import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Timer = (props) => {

    const { time } = props;

    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);

    return (
        <View style={styles.timerBox}>
            <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', color: '#fff' }}>
                {minutes < 10 ? "0" + minutes : minutes} : {seconds.toString().length === 1 ? "0" + seconds : seconds}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timerBox: {
        backgroundColor: 'rgba(75, 75, 75, 0.5)',
        borderRadius: 8,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
    }
});

export default Timer;