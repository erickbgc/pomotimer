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

import firebase from '../database/firebase';

const NavButton = (props) => {

    const tareasActivasInit = [];

    const [tareas, setTareas] = useState([]);
    const [activas, setActivas] = useState(tareasActivasInit);

    useEffect(() => {
        firebase.database.collection('tareas').onSnapshot(querySnapshot => {

            const tasks = [];
            const tareasActivas = [];

            querySnapshot.docs.forEach(doc => {
                const { title, description, pomodoros, done, active } = doc.data();

                if (active) {
                    tareasActivas.push({
                        id: doc.id,
                        title,
                        description,
                        pomodoros,
                        active,
                        done
                    })
                }

                tasks.push({
                    id: doc.id,
                    title,
                    description,
                    pomodoros,
                    active,
                    done
                });
            });

            setTareas(tasks);
            // console.log(tareasActivas.length);
            tareasActivas.length > 0 ? setActivas(tareasActivas) : setActivas(tareasActivasInit);
        });
    }, []);

    // console.log(activas.length)

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <MenuButtonTasks {...props} mode={"Tareas"} addButton={true} />
                <View style={styles.content}>
                    <View style={cardTasks.mainLabel}>
                        <Text style={cardTasks.text}>Planeación</Text>
                    </View>

                    {
                        tareas.map(task => {
                            {
                                if (!task.done) {
                                    return (
                                        <TouchableOpacity
                                            key={task.id}
                                            onPress={() => props.navigation.push('Tarea', { task, activas: activas.length })}
                                        >
                                            <View style={
                                                task.active ? [cardTasks.task, { backgroundColor: 'rgba(104, 109, 224,1.0)' }] : [cardTasks.task, { backgroundColor: '#fff' }]
                                            }
                                            >
                                                <View style={{ flexShrink: 1 }}>
                                                    <Text style={task.active ? [cardTasks.text, { fontSize: 18, overflow: 'hidden', color: '#fff' }] : [cardTasks.text, { fontSize: 18, overflow: 'hidden' }]} numberOfLines={2}>
                                                        {task.title}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <FontAwesome5 name="stopwatch" size={16} color={task.active ? '#fff' : '#707070'} />
                                                    <Text>&nbsp;</Text>
                                                    <Text style={task.active ? { fontSize: 14, fontWeight: 'bold', color: '#fff' } :
                                                        { fontSize: 14, fontWeight: 'bold', color: '#707070' }
                                                    }>{task.pomodoros}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        })
                    }

                    {
                        tareas.map(task => {
                            {
                                if (task.done) {
                                    return (
                                        <TouchableOpacity
                                            key={task.id}
                                            onPress={() => props.navigation.push('Tarea', { task, activas: activas.length })}
                                        >
                                            <View style={[cardTasks.task, { backgroundColor: 'rgba(53, 59, 72, 0.7)' }]}
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
                                    )
                                }
                            }
                        })
                    }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
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
    task: {
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
        paddingVertical: 15,
    },
});

export default NavButton;