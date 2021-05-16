import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    Button
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';

// Navigation Hook
import { useNavigation } from '@react-navigation/native';

// Toolbar Component
import MenuButtonTasks from '../components/MenuButtonTasks';

// Firebase Import
import firebase from '../database/firebase';

const TaskDetails = (props) => {

    // Tareas State
    const navigation = useNavigation();

    const initialState = {
        title: '',
        description: '',
        pomodoros: 1,
    }


    const [state, setState] = useState(initialState);

    const handleTextChange = (name, value) => {
        if (name == 'pomodoros' && isNaN) {
            const numeroPomodoros = Number(value);
            setState({ ...state, [name]: numeroPomodoros });
        } else {
            setState({ ...state, [name]: value });
        }
    }

    const saveNewTask = async () => {
        if (state.title === '' || state.description === '' || (state.pomodoros <= 0 || state.pomodoros == undefined)) {
            alert('Comprueba los datos ingresados');
        } else {
            try {
                // console.log(state);
                await firebase.database.collection('tareas').add({
                    title: state.title,
                    description: state.description,
                    pomodoros: state.pomodoros,
                    createdAt: new Date(),
                    done: false
                })
                navigation.navigate('Lista de Tareas', { state, addon: true });
            } catch (e) {
                console.log(e.message);
            }
        }
    }

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
                                autoCompleteType="off"
                                autoCapitalize="sentences"
                                multiline={true}
                                maxLength={255}
                                onChangeText={(value) => handleTextChange("title", value)}
                                style={{ fontSize: 16 }}
                                value={state.title}
                            />
                        </View>
                        {/* Description Input */}
                        <View style={{ backgroundColor: 'lightgrey', padding: 15, borderRadius: 4, marginTop: 25 }}>
                            <TextInput
                                placeholder='Descripcion'
                                autoCompleteType="off"
                                autoCapitalize="sentences"
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(value) => handleTextChange("description", value)}
                                style={{ fontSize: 16, textAlignVertical: 'top', height: 150 }}
                                value={state.description}
                            />
                        </View>
                        {/* Estimated Pomodoros */}
                        <View style={{ marginTop: 25, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>
                                <FontAwesome5 name="stopwatch" size={16} color="#707070" /> EST. Pomodoros:
                            </Text>
                            <View style={{ padding: 15, backgroundColor: 'lightgrey', borderRadius: 4, width: 100 }}>
                                <TextInput
                                    placeholder='#'
                                    numeric
                                    keyboardType="number-pad"
                                    numberOfLines={1}
                                    maxLength={3}
                                    onChangeText={(value) => handleTextChange("pomodoros", value)}
                                    value={state.pomodoros}
                                />
                            </View>
                        </View>
                        {/* Submit Button */}
                        <View style={{ marginTop: 25 }}>
                            <Button
                                title='Save Task'
                                onPress={saveNewTask}
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