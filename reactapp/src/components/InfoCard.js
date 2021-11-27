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
import {Card} from "@mui/material";
import {useNavigate} from "react-router-dom";
import NoPhoto from '../img/nophoto.jpg';

const InfoCard = ({item, liked, setLiked, row, column}) => {
    let navigate = useNavigate();
    return (
        <Card elevation={6} sx={{ height: '100%', width: '100%', minHeight: '100%', gridRow: row, gridColumn: column}}>
            <CardHeader
                sx={{ height: "10%" }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.avatar}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.place}
                subheader={item.date}
            />
            <CardMedia
                sx={{ height: "60%" }}
                component="img"
                src={item.image ? item.image : NoPhoto}
                alt={item.alt}
            />
            <CardActions disableSpacing sx={{ height: "10%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        {liked ? item.likes : item.likes + 1}
                        <IconButton aria-label="favorite" sx={{color: liked ? 'red' : 'inherit'}} onClick={() => setLiked(!liked)}>
                            <FavoriteIcon />
                        </IconButton>
                    </span>
                <IconButton aria-label="send" onClick={() => navigate(item.link, { replace: false })}>
                    <SendIcon />
                </IconButton>
            </CardActions>
            <CardContent sx={{ height: "20%" }}>
                <Typography variant="body2" color="text.secondary">
                    {item.desc}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;