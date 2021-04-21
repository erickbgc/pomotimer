import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

const pomoTimer = () => {
    return (
        <View style={styles.container}>
            <Button title="Start" onPress={() => Alert.alert('Simple Button pressed')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#D7283D',
        textAlign: 'center'
    },
    pomoContainer: {
        flex: 1, 
        alignContent: 'center',
        fontSize: 32,
        textAlign: 'center'
    },
    mainHeading: {
        color: 'white',
        fontSize: 32
    },
    boton: {
        width: 300,
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 2,
        borderWidth: 1
    },
    txtBtn: {
        color: 'black'
    }
});

export default pomoTimer;