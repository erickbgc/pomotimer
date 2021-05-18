import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Custom Drawer
import Sidebar from '../components/customDrawer';

// Screens
import Pomodoro from './Pomodoro';
import ListaDeTareasScreen from './ListaDeTareasScreen';
import AgregarTareaScreen from './AgregarTareaScreen';
import DetallesDeTareaScreen from './DetallesDeTareaScreen';
import ConfiguracionScreen from './ConfigScreen';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

// Stack and Navigation Drawer Navigators
const TasksStack = createStackNavigator();
const HomeScreenStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

// Navigation Drawer
const HomeScreen = ({ navigation, route }) => (
    <Pomodoro navigation={navigation} route={route} />
);

const Tasks = ({ navigation, route }) => (
    <ListaDeTareasScreen navigation={navigation} route={route} />
);

const AddTask = ({ navigation, route }) => (
    <AgregarTareaScreen navigation={navigation} route={route} />
)

const TaskDetails = ({ navigation, route }) => (
    <DetallesDeTareaScreen navigation={navigation} route={route} />
)

const ConfigScreen = ({ navigation, route }) => (
    <ConfiguracionScreen navigation={navigation} route={route} />
)

const TasksStackScreen = () => (
    <TasksStack.Navigator>
        <TasksStack.Screen name='Lista de Tareas' component={Tasks}
            options={{
                headerShown: false,
            }}
        />
        <TasksStack.Screen
            name='Agregar Tarea'
            component={AddTask}
        />
        <TasksStack.Screen
            name='Tarea'
            component={TaskDetails}
        />
    </TasksStack.Navigator>
)

const HomeStackScreen = () => (
    <HomeScreenStack.Navigator>
        <HomeScreenStack.Screen
            name='Pomodoro'
            component={HomeScreen}
            options={{
                headerShown: false,
            }}
        />
        <HomeScreenStack.Screen
            name='Configuracion'
            component={ConfigScreen}
        />
    </HomeScreenStack.Navigator>
)

const AppDrawerScreen = () => {
    return (
        <AppDrawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <Sidebar {...props} />}
            sceneContainerStyle={{
                backgroundColor: '#000',
            }}
        >
            <AppDrawer.Screen
                name="Inicio"
                component={HomeStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" style={{ fontSize: size, color: color }} />
                    ),
                }}
            />
            <AppDrawer.Screen
                name="Tareas"
                component={TasksStackScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="tasks" style={{ fontSize: size, color: color }} />
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