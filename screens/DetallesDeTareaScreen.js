import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import {
    Checkbox,
    TextInput,
    HelperText,
    Button,
} from 'react-native-paper';

import firebase from '../database/firebase';

const DetallesDeTarea = (props) => {

    const initialState = {
        title: '',
        description: '',
        pomodoros: 1,
        active: false,
        done: false,
        createdAt: new Date()
    }

    // Loader Component to prevent that the screen is being displayed without retriving the values from the DB
    const [loading, setLoading] = useState(true);

    // Task retrieved from the ListTask Screen
    const { task, activas } = props.route.params;

    // console.log(activas);

    // State to update the task
    const [state, setState] = useState(initialState);

    // ******* Handlers Validators for Inputs ********

    const validateActiveTasks = () => {
        return activas > 0 ? true : false;
    }

    const hasErrors = (campo) => {
        return campo.length < 1;
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

    const handleCheckboxDone = (name) => {
        setState({ ...state, [name]: !state.done });
    }

    const handleCheckboxActive = (name) => {
        setState({ ...state, [name]: !state.active });
    }

    // ******* END - Handlers Validators for Inputs ********

    // ******* Confirmation Messages *************

    const confirmationForWeb = () => {
        var result = prompt('Estas Seguro que deseas eliminar la tarea? [Si/No]');
        console.log(result);
        if (result == 'Si') {
            console.log('Estoy seguro!');
        } else if (result == 'No') {
            console.log('Cancelado');
        } else {
            while (result == undefined || result == '' || (result != 'Si' || result != 'No')) {
                result = prompt('Estas Seguro que deseas eliminar la tarea? [Si/No]');
                if (result == 'Si') {
                    console.log('Estoy seguro!');
                    break
                } else if (result == 'No') {
                    console.log('Cancelado');
                    break
                }
            }
        }
    }

    const openConfirmationAlert = () => {
        Platform.OS == 'android' ?
            Alert.alert(
                "Eliminar Tarea",
                "Estas seguro que deseas eliminar la tarea?",
                [
                    { text: "Si", onPress: () => deleteTask() },
                    { text: "No", onPress: () => console.log('') },
                ],
                {
                    cancelable: true,
                }
            )
            :
            confirmationForWeb()
    };

    // ******* END - Confirmation Messages *******

    // ****** Calls to the Cloud Database ******

    // Recuperar la tarea
    const getTaskById = async id => {
        const dbRef = firebase.database.collection('tareas').doc(id);
        const doc = await dbRef.get();
        const task = doc.data();
        setState({
            ...task,
            id: doc.id,
        });
        setLoading(false);
    }

    // console.log(state.active);

    // Actualizar Tarea
    const updateTask = async () => {
        if (hasErrors && estPomoHasErrors) {

            if (state.active) {
                if (activas > 0 && task.active) {

                    if (!state.done) {
                        const taskRef = firebase.database.collection('tareas').doc(state.id);
                        setLoading(true);
                        await taskRef.set({
                            title: state.title,
                            description: state.description,
                            pomodoros: state.pomodoros,
                            active: state.active,
                            done: state.done,
                            modifiedAt: new Date()
                        }, { merge: true });
                        setState(initialState);
                        setLoading(false);
                        props.navigation.navigate('Lista de Tareas');
                    } else if (state.done) {
                        alert('La tarea no puede estar activa si esta marcada como realizada.');
                    }

                } else if (activas <= 0) {

                    const taskRef = firebase.database.collection('tareas').doc(state.id);
                    setLoading(true);
                    await taskRef.set({
                        title: state.title,
                        description: state.description,
                        pomodoros: state.pomodoros,
                        active: state.active,
                        done: state.done,
                        modifiedAt: new Date()
                    }, { merge: true });
                    setState(initialState);
                    setLoading(false);
                    props.navigation.navigate('Lista de Tareas');

                } else if (activas > 0) {
                    alert('Solo puede existir una tarea activa.');
                }
            } else if (state.active == false) {
                const taskRef = firebase.database.collection('tareas').doc(state.id);
                setLoading(true);
                await taskRef.set({
                    title: state.title,
                    description: state.description,
                    pomodoros: state.pomodoros,
                    active: state.active,
                    done: state.done,
                    modifiedAt: new Date()
                }, { merge: true });
                setState(initialState);
                setLoading(false);
                props.navigation.navigate('Lista de Tareas');
            }

        } else {
            alert('Verifica los campos que desea actualizar.');
        }
    }

    const deleteTask = async () => {
        setLoading(true);
        const taskRef = firebase.database.collection('tareas').doc(state.id);
        await taskRef.delete();
        setLoading(false);
        props.navigation.navigate('Lista de Tareas');
    }

    useEffect(() => {
        getTaskById(task.id);
    }, [])

    // ****** END - Calls to the Cloud Database ******

    // Loader, se ejecuta cuando los datos de la BD estan siendo procesados
    if (loading) {
        <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#9e9e9e' />
        </View>
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                {/* Input Group */}
                <View style={styles.inputGroup}>
                    {/* Title Input */}
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
                    {/* Active Field */}
                    <View style={{ marginTop: 25 }}>
                        <Checkbox.Item
                            label="Tarea actual"
                            labelStyle={{ fontWeight: 'bold' }}
                            status={state.active ? 'checked' : 'unchecked'}
                            color="blue"
                            onPress={() => handleCheckboxActive('active')}
                        />
                    </View>
                    {/* Done Field */}
                    <View style={{ marginTop: 25 }}>
                        <Checkbox.Item
                            label="Finalizado"
                            labelStyle={{ fontWeight: 'bold' }}
                            status={state.done ? 'checked' : 'unchecked'}
                            color="blue"
                            onPress={() => handleCheckboxDone('done')}
                        />
                    </View>
                    {/* Update Button */}
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 25 }}>
                        <Button
                            mode='contained'
                            icon="reload"
                            onPress={() => updateTask()}
                            contentStyle={{ width: 150, paddingHorizontal: 10 }}
                        >
                            Actualizar
                        </Button>
                        <Button
                            mode='contained'
                            icon="delete"
                            onPress={() => openConfirmationAlert()}
                            contentStyle={{ width: 150, paddingHorizontal: 10 }}
                            color='#E74C3C'
                        >
                            Eliminar
                    </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
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
        fontSize: 16
    },
    estPomodorosTextInput: {
        borderRadius: 4,
        width: 100
    }
});

export default DetallesDeTarea;