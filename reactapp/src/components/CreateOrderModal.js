import React, {useState, useEffect} from 'react';
import {
    Box,
    IconButton,
    List,
    ListItemText,
    Modal,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskForm from "./TaskForm";
import {useDispatch} from "react-redux";
import {createCompanyOrderThunkCreator, updateCompanyOrderThunkCreator} from "../store/tasksReducer";


const CreateOrderModal = ({visible, setVisible, orders}) => {
    //форму заполнения какого заказа открыть
    //-1 - новый заказ
    const [open, setOpen] = useState(-1)
    const dispatch = useDispatch()
    const orderDefault = {
        id: 0,
        title: '',
        description: '',
        price: 0,
        deadline: 0,
        topic: 1,
        publication_date: new Date().toISOString().split('T')[0]
    }
    const [order, setOrder] = useState(orderDefault)

    const onOrderClick = (item) => {
        if(open === item.id){
            setOrder(orderDefault)
            setOpen(-1)
        } else {
            setOrder(item)
            setOpen(item.id)
        }
    }

    const createOrder = (event) => {
        event.preventDefault()
        dispatch(createCompanyOrderThunkCreator(order))
    }

    const updateOrder = (event) => {
        event.preventDefault()
        dispatch(updateCompanyOrderThunkCreator(order.id, order))
    }
    return (
        <Modal
            open={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="orders-title"
            aria-describedby="orders-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '70%', height: '80%', backgroundColor: 'white', p: '0'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '10%', backgroundColor: 'secondary.main', p: '0 20px'}}>
                    <Typography variant="h2" component="h2" sx={{fontSize: '24px'}}>
                        Создать новый заказ или изменить уже созданный
                    </Typography>
                    <IconButton area-label='close' onClick={() => setVisible(false)}>
                        <CloseIcon sx={{fontSize: '24px'}}/>
                    </IconButton>
                </Box>
                    <List sx={{overflowY: 'scroll', overflowX: 'hidden', height: '90%'}}>
                        <ListItemButton divider onClick={() => onOrderClick(orderDefault)}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary='Создать новый заказ' />
                            {open === 0 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton >
                        <Collapse in={open === 0} timeout="auto" unmountOnExit>
                            <TaskForm order={order} setOrder={setOrder} sendForm={createOrder}
                            />
                        </Collapse>
                        {orders.map(item => (
                            <>
                                <ListItemButton divider onClick={() => onOrderClick(item)}>
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                    {open === item.id ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton >
                                <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                                    <TaskForm readOnly order={order} setOrder={setOrder} sendForm={updateOrder}/>
                                </Collapse>
                            </>
                        ))}
                    </List>
            </Box>
        </Modal>
    );
};

export default CreateOrderModal;