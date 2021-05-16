import React from 'react';
import { View, TouchableNativeFeedback, Alert, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const handleViewPlatform = (props) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
        return (
            <View>
                <Icon
                    color="#000"
                    containerStyle={{ color: '#fff', marginLeft: 15 }}
                    raised
                    size={18}
                    Component={TouchableNativeFeedback}
                    onPress={props.action}
                    underlayColor="#bdc3c7"
                    type="ionicon"
                    name='refresh-outline' />
            </View>
        )
    } else if (Platform.OS === 'web') {
        return (
            <View>
                <Icon
                    color="#000"
                    containerStyle={{ color: '#fff', marginLeft: 15 }}
                    raised
                    size={18}
                    Component={TouchableOpacity}
                    onPress={props.action}
                    underlayColor="#bdc3c7"
                    type="ionicon"
                    name='refresh-outline' />
            </View>
        )
    }
}

const resetButton = props => (
    handleViewPlatform(props)
)

export default resetButton;