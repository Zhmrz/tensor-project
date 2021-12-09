import React, {useState} from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import PanToolIcon from '@mui/icons-material/PanTool';
import {createRespThunkCreator, setRespCreated, setRespError} from "../store/respReducer";
import {useDispatch, useSelector} from "react-redux";

//item = ('id', 'customer', 'title', 'description', 'price','deadline', 'status', 'performer', 'publication_date', 'topic')
const TaskModal = ({item, visibleTask, setVisibleTask}) => {
    const dispatch = useDispatch()
    const task = item ? item : {id: 0, title: 'No name', description: 'No description', price: 0, deadline: undefined, status: 'active', publication_date: ''}
    const respSuccess = useSelector(state => state.resp.respCreated)
    const respError = useSelector(state => state.resp.respError)
    const onClose = () => {
        dispatch(setRespCreated(false))
        dispatch(setRespError(false))
        setVisibleTask(0)
    }
    return (
        <Modal
            open={visibleTask}
            onClose={() => onClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '50%', backgroundColor: 'white', p: '20px'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h2" component="h2">
                        Информация о заказе № {task.id}
                    </Typography>
                    <Typography variant="p" component="">
                        Статус: {task.status}
                    </Typography>
                </Box>
                <Typography variant="p" component="p">
                    Дата публикации: {task.publication_date}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                    Название:
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    {task.title}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                    Описание:
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {task.description}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                    Стоимость выполнения:
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {task.price}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                    Сроки выполнения:
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {task.deadline}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
                    <Button variant="outlined" startIcon={<PanToolIcon sx={{fontSize: '36px', mr: 2}}/>} onClick={() => dispatch(createRespThunkCreator(item.id))}>
                        Откликнуться
                    </Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {respSuccess && <Typography sx={{color: 'green'}}>Отклик успешно зарегистрирован!</Typography>}
                        {respError && <Typography sx={{color: 'red'}}>Ошибка при создании отклика!</Typography>}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskModal;