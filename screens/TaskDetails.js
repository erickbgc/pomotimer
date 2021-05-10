import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import MenuButtonTasks from '../components/MenuButtonTasks';

const TaskDetails = (props) => {
    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor="#e74c3c" />
            <ScrollView contentContainerStyle={styles.container}>
                <MenuButtonTasks {...props} mode={"Agregar Tarea"} backButton={true} />
                <View style={styles.content}>

                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 4 }}>
                        {/* Title Input */}
                        <View style={{ backgroundColor: 'lightgrey', padding: 15, borderRadius: 4 }}>
                            <TextInput
                                placeholder='Titulo'
                                autoCapitalize='sentences'
                                autoCompleteType="off"
                                multiline={true}
                                maxLength={255}
                                style={{ fontSize: 16, textTransform: 'capitalize' }}
                            />
                        </View>
                        {/* Description Input */}
                        <View style={{ backgroundColor: 'lightgrey', padding: 15, borderRadius: 4, marginTop: 25 }}>
                            <TextInput
                                placeholder='Descripcion'
                                autoCapitalize="sentences"
                                autoCompleteType="off"
                                multiline={true}
                                numberOfLines={5}
                                style={{ fontSize: 16, textAlignVertical: 'top', textTransform: 'capitalize' }}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e74c3c'
    },
    content: {
        flex: 1,
        backgroundColor: '#e74c3c',
        marginVertical: 15,
        marginHorizontal: 10,
    },
    shortBreakBack: {
        backgroundColor: '#686de0',
    },
});

export default TaskDetails;