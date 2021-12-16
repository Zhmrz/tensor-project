import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Box, Card, Tooltip} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import NoPhoto from '../img/nophoto.jpg';
import {variants} from "../data/commonData";
import { Link as MUILink} from '@mui/material';


const InfoCard = ({item, liked, setLiked, row, column}) => {
    let navigate = useNavigate();
    const spec = item.topics.map(item => variants[item - 1].label).join()
    const likes = item.likes || 100//Math.floor(Math.random() * (max - min)) + min;
    return (
        <Card elevation={6} sx={{ height: '100%', width: '100%', minHeight: '100%', gridRow: row, gridColumn: column}}>
            <CardHeader
                sx={{ height: "10%"}}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.avatar ? item.avatar : item.name}
                    </Avatar>
                }
                action={
                    <Tooltip title={'Написать через эл. почту'} placement="bottom">
                        <MUILink href={`mailto:${item.email}`}>
                            <IconButton aria-label="settings">
                                <MoreVertIcon sx={{fontSize: '24px'}}/>
                            </IconButton>
                        </MUILink>
                    </Tooltip>
                }
                title={spec || 'Специализация не указана'}
                subheader={item.date || new Date().toLocaleString().split(',')[0]}
            />
            <Box sx={{height: '60%', background: `url(${item.image ? item.image : NoPhoto}) center no-repeat`, backgroundSize: 'auto 100%'}} />
            <CardActions disableSpacing sx={{ height: "10%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid grey'}}>
                    <span>
                        {liked ? likes + 1 : item.likes}
                        <Tooltip title={liked ? "Уже не нравится" : "Нравится"} placement="bottom">
                            <IconButton aria-label="favorite" sx={{color: liked ? 'red' : 'inherit'}} onClick={() => setLiked ? setLiked(!liked) : console.log('Скажем нет самолайку!')}>
                                <FavoriteIcon sx={{fontSize: '24px'}}/>
                            </IconButton>
                        </Tooltip>
                    </span>
                <Tooltip title={'Перейти на сайт пользователя'} placement="bottom">
                    <MUILink href={item.link} target='_blank'>
                        <IconButton aria-label="send">
                            <SendIcon sx={{fontSize: '24px'}}/>
                        </IconButton>
                    </MUILink>
                </Tooltip>
            </CardActions>
            <CardContent sx={{ height: "20%" }}>
                <Typography variant="body2" color="text.secondary">
                    {item.description || 'Пользователь не указал о себе никакой информации. Подозрительно -_-'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;