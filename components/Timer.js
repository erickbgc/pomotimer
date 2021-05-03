import React from 'react';
import {Text} from 'react-native';

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
                {minutes < 10 ? "0" + minutes : minutes} : {seconds.toString().length === 1 ? "0" + seconds : seconds}
            </Text>
        </>
    );
}

export default Timer;