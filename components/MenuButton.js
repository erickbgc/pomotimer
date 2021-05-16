import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const MenuButton = (props) => {

    const { mode, addButton } = props;

    return (
        <View style={styles.toolbar}>
            <TouchableOpacity
                style={{ margin: 16 }}
                onPress={() => props.navigation.toggleDrawer()}>
                <FontAwesome5 name="bars" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.toolbarMode}>
                <Text style={styles.toolbarModeText}>
                    {mode.toString().toUpperCase()}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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