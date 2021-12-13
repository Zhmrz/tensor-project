import React, {useEffect, useState} from 'react';
import InfoCard from "../components/InfoCard";
import {useDispatch, useSelector} from "react-redux";
import {changePhoto, getCompanyData, getMe, getUserData, loadingData} from "../store/userReducer";
import {useParams} from "react-router-dom";
import {Box, Button, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
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
import {
    changeRespStatusThunkCreator,
    deleteRespThunkCreator,
    getRespThunkCreator
} from "../store/respReducer";
import {getCompanyOrdersThunkCreator} from "../store/tasksReducer";
import {loadWork} from "../api/respAPI";
import CircularProgress from "@mui/material/CircularProgress";


const UserPage = ({type}) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
    const md_up = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const sm_md = useMediaQuery(theme.breakpoints.up("md"));
    const sm_down = useMediaQuery(theme.breakpoints.down("sm"));

    const styles = (item) => ({
        button: [{
            gridRow: item.row,
            gridColumn: item.columnSm,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }, md_up && {
            gridColumn: item.column
        }, sm_down && {
            gridColumn: item.column
        }]
    })
    const dispatch = useDispatch()
    let { id } = useParams();

    const buttons = [
        {id: 1, text: 'Отклики', modal: 'wait', row: '1 / span 1', column: '4 / span 2', columnSm: '2 / span 3', onClick: ''},
        {id: 2, text: 'В работе', modal: 'work', row: '1 / span 1', column: '6 / span 2', columnSm: '5 / span 4', onClick: ''},
        {id: 3, text: 'На проверке', modal: 'check', row: '1 / span 1', column: '8 / span 2', columnSm: '9 / span 3', onClick: ''},
        {id: 4, text: 'Редактировать профиль',  modal: 'edit', row: '10 / span 1', column: type ? '4 / span 3' : '4 / span 6', columnSm: type ? '2 / span 5' : '2 / span 10', onClick: ''},
    ]
    const anotherButtons = {id: 1, text: 'Все заказы компании', modal: 'companyWorks', row: '10 / span 1', column: '4 / span 6', onClick: ''}
    if(type){
        buttons.push({id: 5, text: 'Добавить/изменить заказ', modal: 'change', row: '10 / span 1', column: '7 / span 3', columnSm: '7 / span 5', onClick: ''})
    }
    //заказы
    let orders = useSelector(state => state.tasks.company.orders)
    //отклики
    let resp = useSelector(state => state.resp)

    //видимость модальных окон
    const [visibleModal, setVisibleModal] = useState({
        check: false,
        wait: false,
        work: false,
        change: false,
        edit: false
    })
    //найден ли пользователь
    const currentPageExist = useSelector(state => state.user.current.currentPageExist)
    const isLoading = useSelector(state => state.user.status.isLoading)
    console.log(currentPageExist)
    //пользователь просматриваемой страницы
    const userData = useSelector(state => state.user.current)
    const userMe = useSelector(state => state.user.me)
    //идентификатор авторизованного пользователя
    const myId = userMe.id
    const userType = userMe.user_type
    const isMyPage = Number(id) === myId
    useEffect(() => {
        dispatch(loadingData(true))
        if(type){
            dispatch(getMe())
            dispatch(getCompanyData(id))
            dispatch(getRespThunkCreator())
            dispatch(getCompanyOrdersThunkCreator())
        } else {
            dispatch(getUserData(id))
            dispatch(getRespThunkCreator())
        }
    },[])

    //коллбеки в OrderModal
    const returnInWork = (item) => {
        dispatch(changeRespStatusThunkCreator(item.id, 4))
    }
    const payForWork = (item) => {
        dispatch(changeRespStatusThunkCreator(item.id, 3))
    }
    const delResp = (item) => {
        dispatch(deleteRespThunkCreator(item.id))
    }
    const approveFree = (item) => {
        dispatch(changeRespStatusThunkCreator(item.id, 1))
    }
    const cancelFree = (item) => {
        dispatch(changeRespStatusThunkCreator(item.id, 5))
    }
    return (
        //!currentPageExist
        <>
            {isLoading ?
                <Box sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress />
                </Box>
                : !currentPageExist ?
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
                        column={mdUp ? '4 / span 6' : '2 / span 10'}
                        item={userData}
                        liked={true}
                    />
                        {isMyPage && buttons.map(item => (
                            <Box sx={{gridRow: item.row, gridColumn: mdUp ? item.column : item.columnSm, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button variant={'outlined'} key={item.id} sx={{width: '100%', height: '80%', fontSize: '28px'}} onClick={() => setVisibleModal({[item.modal]: true})}>
                                    {item.text}
                                </Button>
                            </Box>
                        ))}
                        {!isMyPage &&
                            <Box sx={{gridRow: anotherButtons.row, gridColumn: anotherButtons.column, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button variant={'outlined'} key={anotherButtons.id} sx={{width: '100%', height: '80%', fontSize: '28px'}} onClick={() => setVisibleModal({[anotherButtons.modal]: true})}>
                                    {anotherButtons.text}
                                </Button>
                            </Box>
                        }
                        <OrdersModal
                            labels={userType ? ['Оплатить работу', 'Вернуть на доработку'] : ['', '']}
                            type='check'
                            orders={resp.checkResp}
                            title='На проверке'
                            visible={visibleModal.check}
                            setVisible={(value) => setVisibleModal({check: value})}
                            YesIcon={CheckIcon}
                            NoIcon={DoNotDisturbOnIcon}
                            yesAction={userType ? payForWork : undefined}
                            noAction={userType ? returnInWork : undefined}
                            withAction={userType}
                            userType={userType}
                        />
                        <OrdersModal
                            labels={userType ? ['Одобрить отклик', 'Отклонить отклик'] : ['', 'Удалить отклик']}
                            type='wait'
                            orders={resp.waitResp}
                            title='Отклики'
                            visible={visibleModal.wait}
                            setVisible={(value) => setVisibleModal({wait: value})}
                            YesIcon={ThumbUpIcon}
                            NoIcon={ThumbDownIcon}
                            yesAction={userType ? approveFree : undefined}
                            noAction={userType ? cancelFree : delResp} //нужна операция на отколнение отклика компанией
                        />
                        <OrdersModal
                            labels={userType ? ['', ''] : ['', 'Отменить работу']}
                            type='work'
                            orders={resp.workResp}
                            title='В работе'
                            visible={visibleModal.work}
                            setVisible={(value) => setVisibleModal({work: value})}
                            YesIcon={FileDownloadIcon}
                            NoIcon={DoDisturbIcon}
                            yesAction={userType ? undefined : undefined} //загрузить файл
                            noAction={userType ? undefined : delResp} //отменить отклик
                            withAction={!userType}
                            userType={userType}
                        />
                        <CreateOrderModal
                            visible={visibleModal.change}
                            setVisible={(value) => setVisibleModal({change: value})}
                            orders={orders}
                        />
                        <EditUserDataModal
                            visible={visibleModal.edit}
                            setVisible={(value) => setVisibleModal({edit: value})}
                            type={userType}
                        />
                    </>
            }
        </>
    );
};

export default UserPage;