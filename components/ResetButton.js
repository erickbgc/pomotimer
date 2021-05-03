import React from 'react';
import { View, TouchableNativeFeedback, Alert, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const resetButton = props => {
    return (
        <View>
            {
                Platform.OS === 'android' && <>
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
                </>
            }
            {
                Platform.OS === 'web' && <>
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
                </>
            }
        </View>
    );
}

export default resetButton;