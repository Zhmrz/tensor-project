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
    Typography
} from "@mui/material";
import {useDispatch} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';


const OrdersModal = ({visible, setVisible, title, request, storeName, onApprove, onReject, NoIcon, YesIcon, noAction, yesAction, orders}) => {
    const dispatch = useDispatch()
    console.log(orders)
    //загрузка откликов из пропсов
    /*const orders = [
        {id: 1, title: 'my task', personName: 'man', personId: 1},
        {id: 2, title: 'my task', personName: 'man', personId: 2},
        {id: 3, title: 'my task', personName: 'man', personId: 3},
        {id: 4, title: 'my task', personName: 'man', personId: 4},
        {id: 5, title: 'my task', personName: 'man', personId: 5},
        {id: 6, title: 'my task', personName: 'man', personId: 6},
        {id: 7, title: 'my task', personName: 'man', personId: 7},
        {id: 9, title: 'my task', personName: 'man', personId: 8},
        {id: 10, title: 'my task', personName: 'man', personId: 9},
        {id: 11, title: 'my task', personName: 'man', personId: 6},
        {id: 12, title: 'my task', personName: 'man', personId: 7},
        {id: 13, title: 'my task', personName: 'man', personId: 8},
        {id: 14, title: 'my task', personName: 'man', personId: 9},
    ]*/
    const noHandler = (e) => {
        e.preventDefault()
        noAction()
    }
    const yesHandler = (e) => {
        e.preventDefault()
        yesAction()
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
                        {title}
                    </Typography>
                    <IconButton area-label='close' onClick={() => setVisible(false)}>
                        <CloseIcon sx={{fontSize: '24px'}}/>
                    </IconButton>
                </Box>
                <List sx={{overflowY: 'scroll', overflowX: 'hidden', height: '90%'}}>
                    {orders.map(item => (
                        <ListItem key={item.id}>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.title} secondary={item.personName}/>
                            <IconButton onClick={(e) => noHandler(e)}>
                                <NoIcon sx={{fontSize: '24px'}}/>
                            </IconButton>
                            <IconButton onClick={(e) => yesHandler(e)}>
                                <YesIcon sx={{fontSize: '24px'}}/>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};

export default OrdersModal;