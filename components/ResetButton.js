import React from 'react';
import { View, TouchableNativeFeedback, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

const resetButton = props => {
    return (
        <View>
            <Icon
                color="#000"
                containerStyle={{color: '#fff', marginLeft: 15}}
                raised
                size={18}
                Component={TouchableNativeFeedback}
                onPress={props.action}
                underlayColor="#bdc3c7"
                type="ionicon"
                name='refresh-outline' />
        </View>
    );
}

export default resetButton;