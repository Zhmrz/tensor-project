import React from 'react';
import {Collapse, List} from '@mui/material';
import TaskItem from "./TaskItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import '../styles/index.css'


const TaskList = ({items, setVisibleTask}) => {
    return (
        <List sx={{width: '100%', mt: "10px", p: 0}}>
            <TransitionGroup>
                {items.map(item => (
                    <CSSTransition
                        key={item.id}
                        in={item.id}
                        timeout={500}
                        classNames="task-item"
                        unmountOnExit
                    >
                        <TaskItem item={item} setVisibleTask={setVisibleTask}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </List>
    );
};

export default TaskList;


/*
<Collapse key={item.id} easing={{enter: ''}}>
                        <TaskItem item={item} setVisibleTask={setVisibleTask}/>
                    </Collapse>
 */