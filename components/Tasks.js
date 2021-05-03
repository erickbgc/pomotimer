import React from 'react';
import {Text} from 'react-native';

const Tasks = (props) => {

    const {tasks} = props;

    return(
        <>
            {
                tasks.map(task => 
                    
                    <Text key={task.id} style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                       Titulo: {task.title} {'\n'}
                       Descripcion: {task.description} {'\n'}
                       Pomodoros: {task.pomodoros} {'\n'}
                       Status: {(task.done).toString()} {'\n'}
                    </Text>

                    )
            }
        </>
    );

}

export default Tasks;