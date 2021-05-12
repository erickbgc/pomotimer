import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Custom Drawer
import Sidebar from '../components/customDrawer';

// Screens
import Pomodoro from './Pomodoro';
import TasksScreen from './TasksScreen';
import TaskDetails from './TaskDetails';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import MenuButtonTasks from '../components/MenuButtonTasks';

// Stack and Navigation Drawer Navigators
const TasksStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

// Navigation Drawer
const HomeScreen = ({ navigation }) => (
    <Pomodoro navigation={navigation} />
);

const Tareas = ({ navigation, route }) => (
    <TasksScreen navigation={navigation} route={route} />
);

const TareasDetalles = ({ navigation, route }) => (
    <TaskDetails navigation={navigation} route={route} />
)

const TasksStackScreen = () => (
    <TasksStack.Navigator>
        <TasksStack.Screen name='Lista de Tareas' component={Tareas} initialRouteName="Lista de Tareas"
            options={{
                headerShown: false,
            }}
        />
        <TasksStack.Screen
            name='Agregar Tarea'
            component={TareasDetalles}
            options={{
                headerShown: false,
            }}
        />
    </TasksStack.Navigator>
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
                component={HomeScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <FontAwesome5 name="home" style={{ fontSize: size, color: color }} />
                    ),
                }}
            />
            <AppDrawer.Screen
                name="Tareas"
                component={TasksStackScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
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