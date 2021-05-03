import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const NavButton = (props) => {
    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.container.flex}>
                    <TouchableOpacity 
                        style={{alignItems: 'flex-end', margin: 16}}
                        onPress={ () => props.navigation.toggleDrawer() }
                    >
                        <FontAwesome5 name='bars' size={24} color='#fff' />
                    </TouchableOpacity>

                    <View
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                            {props.name} Screen
                        </Text>
                    </View>

                </SafeAreaView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e74c3c'
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight: '500'
    }
});

export default NavButton;