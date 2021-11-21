import React, {useState} from 'react';
import styled from 'styled-components';
import {
    Input,
    Typography,
    TextField,
    Box,
    MenuItem,
    FormGroup,
    Checkbox,
    FormControlLabel,
    FormLabel
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import SchoolIcon from '@mui/icons-material/School';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [type, setType] = useState('man');
    const [category, setCategory] = useState({
        typo: false,
        dev: false,
        model: false,
        photo: false,
        edu: false,
        img: false
    });

    const variants = [
        {label: 'Типографика', name: 'typo', icon: <TextFieldsIcon />, active: <TextFieldsIcon color='success'/>},
        {label: 'Программирование', name: 'dev', icon: <CodeIcon />, active: <CodeIcon color='success'/>},
        {label: '3D-моделирование', name: 'model', icon: <ThreeDRotationIcon />, active: <ThreeDRotationIcon color='success'/>},
        {label: 'Фотография', name: 'photo', icon: <PhotoCameraIcon />, active: <PhotoCameraIcon color='success'/>},
        {label: 'Образование', name: 'edu', icon: <SchoolIcon />, active: <SchoolIcon color='success'/>},
        {label: 'Графика', name: 'img', icon: <CreateIcon />, active: <CreateIcon color='success'/>},
    ]
    const handleCheck = (event) => {
        setCategory(({
            ...category,
            [event.target.name]: event.target.checked,
        }))
    };
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const sendForm = (event) => {
        event.preventDefault()
        //будет обработка с помощью промиса, отправка по axios
        if(true){
            navigate('/search')
        }
    }
    return (
        <>
            <Box
                component="div"
                sx={{
                    gridRow: '1 / span 1',
                    gridColumn: '3 / span 6',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                noValidate
                autoComplete="on"
            >
                <Typography align='center' sx={{fontSize: '18px'}}>Зарегистрироваться или Войти</Typography>
            </Box>
            <Box
                component="form"
                sx={{
                    gridRow: '2 / span 8',
                    gridColumn: '3 / span 6',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
                noValidate
                autoComplete="on"
            >
                <TextField
                    id="select-type"
                    required
                    select
                    label="Выберите тип аккаунта"
                    value={type}
                    onChange={handleChange}
                >
                    <MenuItem value='man'>
                        Фрилансер
                    </MenuItem>
                    <MenuItem value='company'>
                        Компания
                    </MenuItem>
                </TextField>
                {type === 'man' ?
                    <>
                        <TextField
                            required
                            id="name"
                            label="Имя"
                            defaultValue="Доминик"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            required
                            id="surname"
                            label="Фамилия"
                            defaultValue="Торетто"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            id="portfolio"
                            label="Ссылка на портфолио"
                            type="url"
                            fullWidth
                            margin="dense"
                            helperText="Портфолио позволит Вам показать профессионализм и получить одобрение от заказчика"
                        />
                    </> :
                    <>
                        <TextField
                            required
                            id="name"
                            label="Название"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            id="portfolio"
                            label="Ссылка на сайт компании"
                            type="url"
                            fullWidth
                            margin="dense"
                            helperText="Сайт позволит Вам убедить фрилансеров в серьезности своих намерений :)"
                        />
                    </>
                }
                <FormLabel component="legend">
                    Выберите интересующие направления:
                </FormLabel>
                <FormGroup sx={{display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "flex-start"}}>
                    {variants.map((item) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={category[item.name]}
                                    onChange={handleCheck}
                                    name={item.name}
                                    icon={item.icon}
                                    checkedIcon={item.active}
                                />
                            }
                            label={item.label}
                            sx={{width: "30%"}}
                        />
                    ))}
                </FormGroup>
                <TextField
                    required
                    id="mail"
                    label="Электронная почта"
                    type="email"
                    fullWidth
                    margin="dense"
                />
                <TextField
                    required
                    id="password"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="dense"
                />
                <TextField
                    required
                    id="submit"
                    type="submit"
                    fullWidth
                    margin="dense"
                    onClick={sendForm}
                />
            </Box>
        </>
    );
};

export default LoginPage;