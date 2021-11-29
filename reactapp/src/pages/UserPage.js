import React, {useEffect} from 'react';
import InfoCard from "../components/InfoCard";
import UserInfo from "../components/UserInfo";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../store/userReducer";
import {Navigate, useParams} from "react-router-dom";
import NotFound from "./NotFound";
import {Box, Paper, Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";


const UserPage = () => {
    let { id } = useParams();
    const currentPageExist = useSelector(state => state.user.currentPageExist)
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()
    let item = {}
    if(currentPageExist){
        const rating = 50
        item = {place: 'Россия', date: '22 ноября, 2021',avatar: userData.name || '', image: undefined, alt: userData.name  || '', likes: rating,...userData}
    }
    useEffect(() => {
        console.log('get user data')
        dispatch(getUserData(id))
    },[])

    return (
        <>
            {!currentPageExist ?
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
                    <UserInfo row='2 / span 8' column='1 / span 6'/>
                    <InfoCard row='2 / span 8' column='8 / span 5' item={item} liked={true} setLiked={() => console.log('no')}/>
                </>
            }
        </>
    );
};

export default UserPage;