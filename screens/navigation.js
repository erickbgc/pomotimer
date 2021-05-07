import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Custom Drawer
import Sidebar from '../components/customDrawer';

// Screens
import Pomodoro from './Pomodoro';
import NavButton from './NavButton';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

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
            drawerContent={props => <Sidebar {...props} />}
            >
            <AppDrawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({focused, color, size}) => (
                        <FontAwesome5 name="home" style={{fontSize: size, color: color}} />
                    ),
                }}
            />
            <AppDrawer.Screen
                name="Tasks"
                component={Tareas}
                options={{
                    drawerIcon: ({focused, color, size}) => (
                        <FontAwesome5 name="tasks" style={{fontSize: size, color: color}} />
                    ),
                }}
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