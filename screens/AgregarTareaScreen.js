import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Button,
    ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import {
    TextInput,
    HelperText,
} from 'react-native-paper';

// Navigation Hook
import { useNavigation } from '@react-navigation/native';

// Firebase Import
import firebase from '../database/firebase';

const TaskDetails = (props) => {

    // Tareas State
    const navigation = useNavigation();

    const initialState = {
        title: '',
        description: '',
        pomodoros: 1,
        done: false,
        createdAt: new Date()
    }

    const [state, setState] = useState(initialState);

    // Loader
    const [loading, setLoading] = useState(true);

    // ******* Handlers Validators for Inputs ********

    const hasErrors = (campo) => {
        return campo.length <= 0;
    }

    const estPomoHasErrors = (campo) => (
        campo <= 0
    )

    const handleTextChange = (name, value) => {
        if (name == 'pomodoros' && isNaN) {
            const numeroPomodoros = Number(value);
            setState({ ...state, [name]: numeroPomodoros });
        } else {
            setState({ ...state, [name]: value });
        }
    }

    // ******* END - Handlers Validators for Inputs ********

    const saveNewTask = async () => {
        if (
            state.title === '' || state.description === '' ||
            (state.pomodoros <= 0 || state.pomodoros == undefined) ||
            (!hasErrors || !estPomoHasErrors)
        ) {
            alert('Comprueba los datos ingresados');
        } else {
            try {
                setLoading(true);
                await firebase.database.collection('tareas').add({
                    title: state.title,
                    description: state.description,
                    pomodoros: state.pomodoros,
                    createdAt: new Date(),
                    done: false
                })
                setState(initialState);
                setLoading(false);
                navigation.navigate('Lista de Tareas');
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    // Loader, se ejecuta cuando los datos de la BD estan siendo procesados
    if (loading) {
        <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#9e9e9e' />
        </View>
    }

    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor="#e74c3c" />
            <ScrollView contentContainerStyle={styles.container}>
                {/* <MenuButtonTasks {...props} mode={"Agregar Tarea"} backButton={true} /> */}
                <View style={styles.content}>
                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                        <View style={styles.input}>
                            <TextInput
                                label="Titulo"
                                autoCompleteType="off"
                                autoCapitalize="sentences"
                                multiline={false}
                                maxLength={255}
                                onChangeText={(value) => handleTextChange('title', value)}
                                style={{ fontSize: 16 }}
                                value={state.title}
                            />
                            <HelperText
                                visible={hasErrors(state.title)}
                                type='error'
                            >
                                Este campo es obligatorio.
                        </HelperText>
                        </View>
                        {/* Description Input */}
                        <View style={[styles.input, { marginTop: 25 }]}>
                            <TextInput
                                label="Descripcion"
                                autoCompleteType="off"
                                autoCapitalize="sentences"
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(value) => handleTextChange('description', value)}
                                style={styles.textarea}
                                value={state.description}
                            />
                            <HelperText
                                visible={hasErrors(state.description)}
                                type='error'
                            >
                                Este campo es obligatorio.
                        </HelperText>
                        </View>
                        {/* Estimated pomodoros */}
                        <View style={styles.estPomodorosInputGroup}>
                            <Text style={styles.estPomodorosText}>
                                <FontAwesome5 name="stopwatch" size={16} color="#707070" /> EST. Pomodoros:
                            </Text>
                            <View style={styles.estPomodorosTextInput}>
                                <TextInput
                                    placeholder='#'
                                    numeric
                                    keyboardType="number-pad"
                                    numberOfLines={1}
                                    maxLength={3}
                                    style={{ height: 50 }}
                                    onChangeText={(value) => handleTextChange('pomodoros', value)}
                                    value={(state.pomodoros).toString()}
                                />
                                <HelperText
                                    visible={estPomoHasErrors(state.pomodoros)}
                                    type='error'
                                >
                                    Este campo debe ser mayor a 0.
                                </HelperText>
                            </View>
                        </View>
                        {/* Submit Button */}
                        <View>
                            <Button
                                title='Guardar Tarea'
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
    inputGroup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 4,
        paddingHorizontal: 20
    },
    input: {
        borderRadius: 4
    },
    textarea: {
        fontSize: 16,
        textAlignVertical: 'top',
        height: 150,
    },
    estPomodorosInputGroup: {
        marginTop: 25,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    estPomodorosText: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        textAlignVertical: 'top'
    },
    estPomodorosTextInput: {
        borderRadius: 4,
        width: 100
    }
});

export default TaskDetails;