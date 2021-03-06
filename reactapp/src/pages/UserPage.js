import React, {useEffect, useState} from 'react';
import InfoCard from "../components/InfoCard";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyData, getUserData} from "../store/userReducer";
import {Link, useNavigate, useParams} from "react-router-dom";
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
    getRespThunkCreator, loadFileRespThunkCreator
} from "../store/respReducer";
import {getCompanyOrdersThunkCreator} from "../store/tasksReducer";
import {buttonsComp, buttonsFree, anotherButtons} from "../data/commonData";
import {getMe, loadingData} from "../store/userReducer";
import DataLoading from "../components/DataLoading";


const UserPage = ({type}) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
    const md_up = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const sm_md = useMediaQuery(theme.breakpoints.up("md"));
    const sm_down = useMediaQuery(theme.breakpoints.down("sm"));
    let { id } = useParams();
    let buttons = type ? buttonsComp : buttonsFree
    let user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadingData(true))
        console.log('curr id' + id)
        console.log('my id' + user.me.id)
        if(type){
            dispatch(getCompanyData(id, id === user.me.id))
            if(Number(id) === user.me.id){
                dispatch(getRespThunkCreator())
                dispatch(getCompanyOrdersThunkCreator())
            }
        } else {
            dispatch(getUserData(id, id === user.me.id))
            if(Number(id) === user.me.id){
                dispatch(getRespThunkCreator())
            }
        }
    },[user.me.id])
    const navigate = useNavigate()
    //????????????
    let orders = useSelector(state => state.tasks.company.orders)
    //??????????????
    let resp = useSelector(state => state.resp)
    let updates = useSelector(state => state.user.status.successUpd)
    //?????????????????? ?????????????????? ????????
    const [visibleModal, setVisibleModal] = useState({
        check: false,
        wait: false,
        work: false,
        change: false,
        edit: false
    })
    //???????????? ???? ????????????????????????
    let currentPageExist = useSelector(state => state.user.current.currentPageExist)
    let isLoading = useSelector(state => state.user.status.isLoading)
    console.log(currentPageExist)
    //???????????????????????? ?????????????????????????????? ????????????????
    let userData = useSelector(state => state.user.current)
    let userMe = useSelector(state => state.user.me)
    //?????????????????????????? ?????????????????????????????? ????????????????????????
    let myId = userMe.id
    let userType = userMe.user_type
    let isMyPage = (Number(id) === myId) && (type === userType)

    //???????????????? ?? OrderModal
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
        <>
            {isLoading ?
                <DataLoading />
                : !currentPageExist ?
                    <Paper elevation='6' sx={{gridRow: '2 / span 2', gridColumn: '2 / span 10', p: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '32px'}}>
                        <Box>
                            <Typography variant='h2' component="h2">
                                ???????????? ???????????????????????? ???? ???????????????????? :(
                            </Typography>
                            <Typography variant='p' component="p" sx={{mt: 2}}>
                                ????????????, ???? ?????? ?????????????????? ???????? ???????????????? ?? ???????????????? ??????-???? ???? ????????????????
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
                        <OrdersModal
                            labels={userType ? ['???????????????? ????????????', '?????????????? ???? ??????????????????'] : ['', '']}
                            type='check'
                            orders={resp.checkResp}
                            title='???? ????????????????'
                            visible={visibleModal.check}
                            setVisible={(value) => setVisibleModal({check: value})}
                            YesIcon={CheckIcon}
                            NoIcon={DoNotDisturbOnIcon}
                            yesAction={userType ? payForWork : undefined}
                            noAction={userType ? returnInWork : undefined}
                            withAction={userType === 1}
                            userType={userType}
                        />
                        <OrdersModal
                            labels={userType ? ['???????????????? ????????????', '?????????????????? ????????????'] : ['', '?????????????? ????????????']}
                            type='wait'
                            orders={resp.waitResp}
                            title='??????????????'
                            visible={visibleModal.wait}
                            setVisible={(value) => setVisibleModal({wait: value})}
                            YesIcon={ThumbUpIcon}
                            NoIcon={ThumbDownIcon}
                            yesAction={userType ? approveFree : undefined}
                            noAction={userType ? cancelFree : delResp} //?????????? ???????????????? ???? ???????????????????? ?????????????? ??????????????????
                            userType={userType}
                        />
                        <OrdersModal
                            labels={userType ? ['', ''] : ['', '???????????????? ????????????']}
                            type='work'
                            orders={resp.workResp}
                            title='?? ????????????'
                            visible={visibleModal.work}
                            setVisible={(value) => setVisibleModal({work: value})}
                            YesIcon={FileDownloadIcon}
                            NoIcon={DoDisturbIcon}
                            yesAction={userType ? undefined : undefined} //?????????????????? ????????
                            noAction={userType ? undefined : delResp} //???????????????? ????????????
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
                            userData={user.me}
                        />
                    </>
            }
        </>
    );
};

export default UserPage;