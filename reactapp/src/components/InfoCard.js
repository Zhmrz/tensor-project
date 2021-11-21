import React, {useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import image from "../img/dog.png";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Card} from "@mui/material";
import {useNavigate} from "react-router-dom";

const InfoCard = () => {
    let navigate = useNavigate();
    const [like, setLike] = useState(false)
    return (
        <Card elevation={6} sx={{ height: '100%', width: '100%', minHeight: '100%', gridRow: '2 / span 8', gridColumn: '7 / span 4'}}>
            <CardHeader
                sx={{ height: "10%" }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Тюмень, Тюменская обл."
                subheader="Ноябрь 21, 2021 г."
            />
            <CardMedia
                sx={{ height: "60%" }}
                component="img"
                src={image}
                alt="Paella dish"
            />
            <CardActions disableSpacing sx={{ height: "10%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        {like ? 1001 : 1000}
                        <IconButton aria-label="add to favorites" color={like ? 'warning' : 'inherit'} onClick={() => setLike(!like)}>
                            <FavoriteIcon />
                        </IconButton>
                    </span>
                <IconButton aria-label="send" onClick={() => navigate("/login", { replace: false })}>
                    <SendIcon />
                </IconButton>
            </CardActions>
            <CardContent sx={{ height: "20%" }}>
                <Typography variant="body2" color="text.secondary">
                    Этот великолепный собакен заработал больше, чем сын маминой подруги на ставках и биржевых операциях. Узнайте, как доказать свой профессионализм и заработать первый миллион косточек (денег)!
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;