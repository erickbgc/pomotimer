import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Pomodoro from '../components/Pomodoro';
import NavButton from './NavButton';

const HomeScreen = ({navigation}) => (
    <Pomodoro navigation={navigation} />
);

const Tareas =  ({navigation}) => (
    <NavButton name="Sample" navigation={navigation} />
)

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => {
    return (
        <AppDrawer.Navigator 
            initialRouteName="Home" 
            drawerType="slide"
            >
            <AppDrawer.Screen
                name="Home"
                component={HomeScreen}
            />
            <AppDrawer.Screen
                name="Sample"
                component={Tareas}
            />
        </AppDrawer.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <AppDrawerScreen />
        </NavigationContainer>
    );
};

export default Navigation;