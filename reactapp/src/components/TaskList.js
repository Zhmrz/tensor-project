import React from 'react';
import {List} from '@mui/material';
import TaskItem from "./TaskItem";

const TaskList = ({items, setVisibleTask}) => {
    return (
        <List sx={{width: '100%', mt: "10px", p: 0}}>
            {items.map(item => (
                <TaskItem item={item} key={item.id} setVisibleTask={setVisibleTask}/>
            ))}
        </List>
    );
};

export default TaskList;