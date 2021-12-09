import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Box, Card, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import NoPhoto from '../img/nophoto.jpg';

const InfoCard = ({item, liked, setLiked, row, column}) => {
    let navigate = useNavigate();
    const [min, max] = [1, 125000]
    const likes = item.likes || Math.floor(Math.random() * (max - min)) + min;
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
                    <IconButton aria-label="settings">
                        <MoreVertIcon sx={{fontSize: '24px'}}/>
                    </IconButton>
                }
                title={item.place || item.topics || 'Специализация не указана'}
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
                <IconButton aria-label="send" onClick={() => navigate(item.link || '', { replace: false })}>
                    <SendIcon sx={{fontSize: '24px'}}/>
                </IconButton>
            </CardActions>
            <CardContent sx={{ height: "20%" }}>
                <Typography variant="body2" color="text.secondary">
                    {item.desc || 'Пользователь не указал о себе никакой информации. Подозрительно -_-'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;