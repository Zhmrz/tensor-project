import React, {useEffect} from 'react';
import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Typography,
    Tooltip
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CustomFileInput from "./CustomFileInput";
import {downloadFileThunkCreator, uploadFileThunkCreator} from "../store/respReducer";
import {useDispatch} from "react-redux";
import {updSuccess} from "../store/userReducer";
import {statusDict} from "../data/commonData";


const OrdersModal = ({labels, visible, setVisible, title, NoIcon, YesIcon, noAction, yesAction, orders, withAction, userType}) => {
    const dispatch = useDispatch()
    const noHandler = (e, item) => {
        e.preventDefault()
        if(noAction){
            noAction(item)
        }
    }
    const yesHandler = (e, item) => {
        e.preventDefault()
        if(yesAction){
            yesAction(item)
        }
    }
    const download = (id) => {
        return (e, data) => dispatch(downloadFileThunkCreator(id, data))
    }
    const upload = (id) => {
        return (e, data) => dispatch(uploadFileThunkCreator(id))
    }
    //формат отклика
    //{"id":9,"id_freelancer":14,"freelancer":"Marat Sabitov","order":3,"order_title":"Windows 12","responding_date":"2021-12-10","status":0,"completed_order":null}
    return (
        <Modal
            open={visible}
            onClose={() => {
                dispatch(updSuccess(false))
                setVisible(false)}
            }
            aria-labelledby="orders-title"
            aria-describedby="orders-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '70%', height: '80%', backgroundColor: 'white', p: '0'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '10%', backgroundColor: 'secondary.main', p: '0 20px'}}>
                    <Typography variant="h2" component="h2" sx={{fontSize: '24px'}}>
                        {title}
                    </Typography>
                    <IconButton area-label='close' onClick={() => setVisible(false)}>
                        <CloseIcon sx={{fontSize: '24px'}}/>
                    </IconButton>
                </Box>
                <List sx={{overflowY: 'scroll', overflowX: 'hidden', height: '90%'}}>
                    {orders.length ? orders.map(item => (
                        //{"id":9,"id_freelancer":14,"freelancer":"Marat Sabitov","order":3,"order_title":"Windows 12","responding_date":"2021-12-10","status":0,"completed_order":null}
                        <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                            <ListItem key={item.id} sx={{width: '100%'}}>
                                <ListItemAvatar>
                                    <Avatar>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.order_title} secondary={item.freelancer}/>
                                <Typography sx={{mr: '10px'}}>Дата отклика: {item.responding_date}</Typography>
                                <Typography sx={{mr: '10px'}}>Статус: {statusDict[String(item.status)]}</Typography>
                                {labels[0] &&
                                <Tooltip title={labels[0]} placement="bottom">
                                    <IconButton onClick={(e) => yesHandler(e, item)}>
                                        <YesIcon sx={{fontSize: '24px'}}/>
                                    </IconButton>
                                </Tooltip>}
                                {labels[1] &&
                                <Tooltip title={labels[1]} placement="bottom">
                                    <IconButton onClick={(e) => noHandler(e, item)}>
                                        <NoIcon sx={{fontSize: '24px'}}/>
                                    </IconButton>
                                </Tooltip>}
                            </ListItem>
                            {withAction &&
                            <CustomFileInput
                                mainLabel={userType ? 'Скачать файл' : 'Загрузить файл'}
                                actionLabel={userType ? 'Скачать' : 'Загрузить'}
                                withClear={!userType}
                                action={userType ? download(item.id) : upload(item.id)}
                                formData={new FormData()}
                            />
                            }
                        </Box>
                    )): <Typography sx={{m: '10px', textAlign: 'center'}}>В данной категории пока нет откликов</Typography>
                    }
                </List>
            </Box>
        </Modal>
    );
};

export default OrdersModal;