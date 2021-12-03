import React, {useEffect, useState} from 'react';
import InfoCard from "../components/InfoCard";
import UserInfo from "../components/UserInfo";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyData, getUserData} from "../store/userReducer";
import {useParams} from "react-router-dom";
import {Box, Button, Paper, Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {getCompanyPage} from "../api/userAPI";
import OrdersModal from "../components/OrdersModal";
import CreateOrderModal from "../components/CreateOrderModal";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import {getOrders, getResponses} from "../api/getTasksApi";


const buttons = [
    {id: 1, text: 'Отклики', modal: 'response', row: '1 / span 1', column: '4 / span 2', onClick: ''},
    {id: 2, text: 'В работе', modal: 'work', row: '1 / span 1', column: '6 / span 2', onClick: ''},
    {id: 3, text: 'На проверке', modal: 'check', row: '1 / span 1', column: '8 / span 2', onClick: ''},
    {id: 4, text: 'Редактировать профиль', row: '10 / span 1', column: '4 / span 3', onClick: ''},
    {id: 5, text: 'Добавить/изменить заказ', modal: 'change', row: '10 / span 1', column: '7 / span 3', onClick: ''},
]


const UserPage = ({type}) => {
    let { id } = useParams();
    const [orders, setOrders] = useState([])
    const [resp, setResp] = useState([])
    const [visibleModal, setVisibleModal] = useState({
        check: false,
        response: false,
        work: false,
        change: false
    })
    const currentPageExist = useSelector(state => state.user.status.currentPageExist)
    const userData = useSelector(state => state.user.current)
    const myId = useSelector(state => state.user.me.id)
    const isMyPage = Number(id) === myId
    const dispatch = useDispatch()
    let item = {}
    if(currentPageExist){
        const rating = 100500
        item = {place: 'Россия', date: '22 ноября, 2021',avatar: userData.name, image: undefined, alt: userData.name, likes: rating,...userData}
    }
    useEffect(() => {
        if(type){
            dispatch(getCompanyData(id))
            getOrders().then((response) => {
            setOrders(response.data)
        }).catch(() => {
            console.log('ошибка закгрузки заказов')
        })
        } else {
            dispatch(getUserData(id))
        }
        getResponses().then((response) => {
            setResp(response.data)
        }).catch(() => {
            console.log('ошибка закгрузки откликов')
        })

    },[])

    return (
        //!currentPageExist
        <>
            {currentPageExist ?
                <Paper elevation='6' sx={{gridRow: '2 / span 2', gridColumn: '2 / span 10', p: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '32px'}}>
                    <Box>
                        <Typography variant='h2' component="h2">
                            Такого пользователя не существует :(
                        </Typography>
                        <Typography variant='p' component="p" sx={{mt: 2}}>
                            Похоже, он уже заработал свои миллионы и отдыхает где-то на островах
                        </Typography>
                    </Box>
                    <SentimentVeryDissatisfiedIcon sx={{fontSize: '54px'}}/>
                </Paper>
                :
                    <>
                    <InfoCard row='2 / span 8' column='4 / span 6' item={item} liked={true} setLiked={() => console.log('no')}/>
                        {isMyPage && buttons.map(item => (
                            <Box sx={{gridRow: item.row, gridColumn: item.column, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button variant={'outlined'} key={item.id} sx={{width: '100%', height: '80%', fontSize: '28px'}} onClick={() => setVisibleModal({[item.modal]: true})}>
                                    {item.text}
                                </Button>
                            </Box>
                        ))}
                        <OrdersModal
                            orders={orders}
                            title='На проверке'
                            visible={visibleModal.check}
                            setVisible={(value) => setVisibleModal({check: value})}
                            YesIcon={CheckIcon}
                            NoIcon={DoNotDisturbOnIcon}
                            yesAction={() => console.log('yes')}
                            noAction={() => console.log('no')}
                        />
                        <OrdersModal
                            orders={resp.filter(i => i.status === 0)}
                            title='Отклики'
                            visible={visibleModal.response}
                            setVisible={(value) => setVisibleModal({response: value})}
                            YesIcon={ThumbUpIcon}
                            NoIcon={ThumbDownIcon}
                            yesAction={() => console.log('yes')}
                            noAction={() => console.log('no')}
                        />
                        <OrdersModal
                            orders={resp.filter(i => i.status === 1)}
                            title='В работе'
                            visible={visibleModal.work}
                            setVisible={(value) => setVisibleModal({work: value})}
                            YesIcon={FileDownloadIcon}
                            NoIcon={DoDisturbIcon}
                            yesAction={() => console.log('yes')}
                            noAction={() => console.log('no')}
                        />
                        <CreateOrderModal
                            visible={visibleModal.change}
                            setVisible={(value) => setVisibleModal({change: value})}
                            orders={orders}
                        />
                    </>
            }
        </>
    );
};

export default UserPage;