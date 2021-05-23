import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import {
    TextInput,
    HelperText,
    Button,
} from 'react-native-paper';

const ConfigScreen = ({ route, navigation }) => {

    const { theme, pomodoros, descansosCortos, descansosLargos, cambios } = route.params;

    const initialState = {
        pomodoros: '',
        descansosCortos: '',
        descansosLargos: '',
        cambios: false
    }

    const [state, setState] = useState(initialState);

    const [loader, setLoader] = useState(true);

    // Recupera la configuracion desde la pantalla principal
    useEffect(() => {
        getConfig();
    }, [])

    const getConfig = () => {
        setState({
            pomodoros,
            descansosCortos,
            descansosLargos,
            cambios
        });
        setLoader(false)
    }

    const updateConfig = () => {
        if (estPomoHasErrors) {
            setState({
                ...state
            });
            console.log(state)
            navigation.navigate('Pomodoro', {
                pomodoros: state.pomodoros * 60,
                descansosCortos: state.descansosCortos * 60,
                descansosLargos: state.descansosLargos * 60,
                cambios: true
            });
        } else {
            alert('Comprueba los campos ingresados');
        }
    }

    // ******* Handlers Validators for Inputs ********

    const estPomoHasErrors = (value) => (
        value <= 0
    )

    const handleNumericInput = (name, value) => {
        if (isNaN(value)) {
            const numero = Number(value);
            setState({ ...state, [name]: numero });
        } else {
            setState({ ...state, [name]: value });
        }
    }

    // ******* END - Handlers Validators for Inputs ********

    // Loader, se ejecuta cuando los datos de la BD estan siendo procesados
    if (loader) {
        <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#9e9e9e' />
        </View>
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
                {/* Input Group */}
                <View style={styles.inputGroup}>
                    {/* Pomodoros */}
                    <View style={styles.estPomodorosInputGroup}>
                        <Text style={styles.estPomodorosText}>
                            <FontAwesome5 name="stopwatch" size={16} color="#707070" />
                            &nbsp;Pomodoros
                        </Text>
                        <View style={styles.estPomodorosTextInput}>
                            <TextInput
                                placeholder='#'
                                numeric
                                keyboardType="number-pad"
                                numberOfLines={1}
                                maxLength={3}
                                style={{ width: 100 }}
                                onChangeText={(value) => handleNumericInput('pomodoros', value)}
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
                    {/* Descansos Cortos */}
                    <View style={[styles.estPomodorosInputGroup, { marginTop: 25 }]}>
                        <Text style={styles.estPomodorosText}>
                            <FontAwesome5 name="stopwatch" size={16} color="#707070" />
                             &nbsp;Descansos Cortos
                        </Text>
                        <View style={styles.estPomodorosTextInput}>
                            <TextInput
                                placeholder='#'
                                numeric
                                keyboardType="number-pad"
                                numberOfLines={1}
                                maxLength={3}
                                style={{ width: 100 }}
                                onChangeText={(value) => handleNumericInput('descansosCortos', value)}
                                value={(state.descansosCortos).toString()}
                            />
                            <HelperText
                                visible={estPomoHasErrors(state.descansosCortos)}
                                type='error'
                            >
                                Este campo debe ser mayor a 0.
                            </HelperText>
                        </View>
                    </View>
                    {/* Descansos Largos */}
                    <View style={[styles.estPomodorosInputGroup, { marginTop: 25 }]}>
                        <Text style={styles.estPomodorosText}>
                            <FontAwesome5 name="stopwatch" size={16} color="#707070" />
                            &nbsp;Descansos Largos
                        </Text>
                        <View style={[styles.estPomodorosTextInput]}>
                            <TextInput
                                placeholder='#'
                                numeric
                                keyboardType="number-pad"
                                numberOfLines={1}
                                maxLength={3}
                                style={{ width: 100 }}
                                onChangeText={(value) => handleNumericInput('descansosLargos', value)}
                                value={(state.descansosLargos).toString()}
                            />
                            <HelperText
                                visible={estPomoHasErrors(state.descansosLargos)}
                                type='error'
                            >
                                Este campo debe ser mayor a 0.
                            </HelperText>
                        </View>
                    </View>
                    {/* Update Button */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                        <Button
                            mode='contained'
                            icon="reload"
                            onPress={() => updateConfig()}
                            style={{ width: 300 }}
                        >
                            Guardar configuracion
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
        backgroundColor: '#e74c3c'
    },
    content: {
        flex: 1,
        backgroundColor: '#e74c3c',
        marginVertical: 15,
        marginHorizontal: 10,
    },
    inputGroup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 4,
        paddingHorizontal: 20
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
        width: 100,
    }
});

export default ConfigScreen;