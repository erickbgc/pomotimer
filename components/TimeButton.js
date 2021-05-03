import React from 'react';
import { View, TouchableNativeFeedback, Alert, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const timeButton = () => {
    return (
        <View>
            {
                Platform.OS === 'android' && <>
                    <Icon
                        Component={TouchableNativeFeedback}
                        onPress={() => { Alert.alert("Hola") }}
                        color="#000"
                        containerStyle={{ color: '#fff', marginRight: 15 }}
                        raised
                        size={18}
                        type="ionicon"
                        name='hourglass-outline' />
                </>
            }
            {
                Platform.OS === 'web' && <>
                    <Icon
                        Component={TouchableOpacity}
                        onPress={() => { alert("Hola") }}
                        color="#000"
                        containerStyle={{ color: '#fff', marginRight: 15 }}
                        raised
                        size={18}
                        type="ionicon"
                        name='hourglass-outline' />
                </>
            }
        </View>
    );
}

export default timeButton;