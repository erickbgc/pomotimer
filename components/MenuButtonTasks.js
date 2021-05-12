import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuButton = (props) => {

    const navigation = useNavigation();

    const { mode, addButton, backButton, methods } = props;

    return (
        <View style={backButton ? [styles.toolbar, { justifyContent: 'flex-start' }] : styles.toolbar} {...props} >
            {
                backButton === true && <>
                    <TouchableOpacity
                        style={{ margin: 16 }}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={24} color="#fff" style={{ fontWeight: 'bold' }} />
                    </TouchableOpacity>
                </>
            }
            {
                !backButton && <>
                    <TouchableOpacity
                        style={{ margin: 16 }}
                        onPress={() => props.navigation.toggleDrawer()}>
                        <FontAwesome5 name="bars" size={24} color="#fff" />
                    </TouchableOpacity>
                </>
            }
            <View style={styles.toolbarMode}>
                <Text style={styles.toolbarModeText}>
                    {mode.toString().toUpperCase()}
                </Text>
            </View>
            {
                addButton !== undefined && <>
                    <TouchableOpacity
                        style={{ margin: 16 }}
                        onPress={() => navigation.push('Agregar Tarea')}
                    >
                        <Ionicons name='add-circle' size={24} color="#fff" />
                    </TouchableOpacity>
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toolbarMode: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbarModeText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
})

export default MenuButton;