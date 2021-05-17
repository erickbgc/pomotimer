import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import MenuButtonTasks from '../components/MenuButtonTasks';
import { ScrollView } from 'react-native-gesture-handler';

// Theme context
import ThemeContext from '../providers/ThemeContext';

import firebase from '../database/firebase';

const NavButton = (props) => {

    const theme = useContext(ThemeContext);

    console.log(theme);

    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        firebase.database.collection('tareas').onSnapshot(querySnapshot => {

            const tasks = [];

            querySnapshot.docs.forEach(doc => {
                const { title, description, pomodoros, done } = doc.data();
                tasks.push({
                    id: doc.id,
                    title,
                    description,
                    pomodoros,
                    done
                });
            });

            setTareas(tasks);
        });
    }, []);

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <ScrollView contentContainerStyle={styles.container}>
                <MenuButtonTasks {...props} mode={"Tareas"} addButton={true} color={theme.backgroundColor} />

                <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
                    <View style={cardTasks.mainLabel}>
                        <Text style={cardTasks.text}>Planeación</Text>
                    </View>
                    {
                        tareas.map((task) => (
                            task.done ?
                                <TouchableOpacity
                                    key={task.id}
                                    onPress={() => props.navigation.push('Tarea', { task })}
                                >
                                    <View style={cardTasks.taskDone}
                                    >
                                        <View style={{ flexShrink: 1 }}>
                                            <Text style={[cardTasks.text, { fontSize: 18, overflow: 'hidden', color: '#fff' }]} numberOfLines={2}>
                                                {task.title}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontAwesome5 name="stopwatch" size={16} color="#fff" />
                                            <Text>&nbsp;</Text>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>{task.pomodoros}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    key={task.id}
                                    onPress={() => props.navigation.push('Tarea', { task })}
                                >
                                    <View style={cardTasks.isNotDone}
                                    >
                                        <View style={{ flexShrink: 1 }}>
                                            <Text style={[cardTasks.text, { fontSize: 18, overflow: 'hidden' }]} numberOfLines={2}>
                                                {task.title}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontAwesome5 name="stopwatch" size={16} color="#707070" />
                                            <Text>&nbsp;</Text>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#707070' }}>{task.pomodoros}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e74c3c'
    },
    content: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 10,
    },
    shortBreakBack: {
        backgroundColor: '#686de0',
    },
});

const cardTasks = StyleSheet.create({
    mainLabel: {
        flex: 0.08,
        minHeight: 58,
        maxHeight: 58,
        borderRadius: 4,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    text: {
        fontSize: 21,
        textTransform: 'uppercase',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#707070'
    },
    taskDone: {
        borderRadius: 4,
        backgroundColor: 'rgba(116, 185, 255,0.9)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
        paddingVertical: 15,
    },
    isNotDone: {
        borderRadius: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
        paddingVertical: 15,
    }
});

export default NavButton;