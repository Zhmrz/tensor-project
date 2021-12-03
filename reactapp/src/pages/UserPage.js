import React, {useEffect, useState} from 'react';
import InfoCard from "../components/InfoCard";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyData, getUserData} from "../store/userReducer";
import {useParams} from "react-router-dom";
import {Box, Button, Paper, Typography} from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import OrdersModal from "../components/OrdersModal";
import CreateOrderModal from "../components/CreateOrderModal";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import EditUserDataModal from "../components/EditUserDataModal";
import {getRespThunkCreator} from "../store/respReducer";
import {getCompanyOrdersThunkCreator} from "../store/tasksReducer";



const UserPage = ({type}) => {
    const dispatch = useDispatch()
    let { id } = useParams();
    const buttons = [
        {id: 1, text: 'Отклики', modal: 'wait', row: '1 / span 1', column: '4 / span 2', onClick: ''},
        {id: 2, text: 'В работе', modal: 'work', row: '1 / span 1', column: '6 / span 2', onClick: ''},
        {id: 3, text: 'На проверке', modal: 'check', row: '1 / span 1', column: '8 / span 2', onClick: ''},
        {id: 4, text: 'Редактировать профиль',  modal: 'edit', row: '10 / span 1', column: type ? '4 / span 3' : '4 / span 6', onClick: ''},
    ]
    if(type){
        buttons.push({id: 5, text: 'Добавить/изменить заказ', modal: 'change', row: '10 / span 1', column: '7 / span 3', onClick: ''})
    }
    //заказы
    const orders = []
    //отклики
    const resp = useSelector(state => state.resp)
    //видимость модальных окон
    const [visibleModal, setVisibleModal] = useState({
        check: false,
        wait: false,
        work: false,
        change: false,
        edit: false
    })
    //найден ли пользователь
    const currentPageExist = useSelector(state => state.user.status.currentPageExist)
    //пользователь просматриваемой страницы
    const userData = useSelector(state => state.user.current)
    //идентификатор авторизованного пользователя
    const myId = useSelector(state => state.user.me.id)
    const isMyPage = Number(id) === myId
    useEffect(() => {
        if(type){
            dispatch(getCompanyData(id))
            if(currentPageExist){
                dispatch(getRespThunkCreator())
                dispatch(getCompanyOrdersThunkCreator())
            }
        } else {
            dispatch(getUserData(id))
            if(currentPageExist) dispatch(getRespThunkCreator())
        }
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
                    <SentimentSatisfiedAltIcon sx={{fontSize: '54px'}}/>
                </Paper>
                :
                    <>
                    <InfoCard
                        row='2 / span 8'
                        column='4 / span 6'
                        item={{likes: 100500, date: new Date().toLocaleDateString(), place: 'Россия', avatar: userData.name, alt: userData.name,...userData}}
                        liked={true}
                    />
                        {isMyPage && buttons.map(item => (
                            <Box sx={{gridRow: item.row, gridColumn: item.column, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button variant={'outlined'} key={item.id} sx={{width: '100%', height: '80%', fontSize: '28px'}} onClick={() => setVisibleModal({[item.modal]: true})}>
                                    {item.text}
                                </Button>
                            </Box>
                        ))}
                        <OrdersModal
                            orders={resp.checkResp}
                            title='На проверке'
                            visible={visibleModal.check}
                            setVisible={(value) => setVisibleModal({check: value})}
                            YesIcon={CheckIcon}
                            NoIcon={DoNotDisturbOnIcon}
                            yesAction={() => console.log('yes')}
                            noAction={() => console.log('no')}
                        />
                        <OrdersModal
                            orders={resp.waitResp}
                            title='Отклики'
                            visible={visibleModal.wait}
                            setVisible={(value) => setVisibleModal({wait: value})}
                            YesIcon={ThumbUpIcon}
                            NoIcon={ThumbDownIcon}
                            yesAction={() => console.log('yes')}
                            noAction={() => console.log('no')}
                        />
                        <OrdersModal
                            orders={resp.workResp}
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
                        <EditUserDataModal
                            visible={visibleModal.edit}
                            setVisible={(value) => setVisibleModal({edit: value})}
                        />
                    </>
            }
        </>
    );
};

export default UserPage;