import React from 'react';
import { View, TouchableNativeFeedback, Alert, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';


const handleView = () => {
    if (Platform.OS === 'android') {
        return (
            <View>
                <Icon
                    Component={TouchableNativeFeedback}
                    onPress={() => { Alert.alert("Hola") }}
                    color="#000"
                    containerStyle={{ color: '#fff', marginRight: 15 }}
                    raised
                    size={18}
                    type="ionicon"
                    name='hourglass-outline' />
            </View>
        )
    } else if (Platform.OS === 'web') {
        return (
            <View>
                <Icon
                    Component={TouchableOpacity}
                    onPress={() => { alert("Hola") }}
                    color="#000"
                    containerStyle={{ color: '#fff', marginRight: 15 }}
                    raised
                    size={18}
                    type="ionicon"
                    name='hourglass-outline' />
            </View>
        )
    }
}

const timeButton = () => (
    handleView()
)

export default timeButton;