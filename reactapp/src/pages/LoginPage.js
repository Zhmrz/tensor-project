import React, {useState} from 'react';
import {
    Typography,
    TextField,
    Box,
    MenuItem,
    FormGroup,
    Checkbox,
    FormControlLabel,
    FormLabel, Button
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import SchoolIcon from '@mui/icons-material/School';
import CreateIcon from '@mui/icons-material/Create';
import CircularProgress from '@mui/material/CircularProgress';
import {
    authUserThunkCreator,
    registerUserThunkCreator,
    setHasAccount,
    setSuccess
} from "../store/userReducer";
import {useDispatch, useSelector} from "react-redux";
import {setUserError} from "../store/userReducer";

const LoginPage = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        type: '0',
        link: '',
        topics: {
            typo: false,
            dev: false,
            model: false,
            photo: false,
            edu: false,
            img: false
        }
    })

    const topicsArr = Object.entries(userData.topics).reduce((acc, val, ind) =>{
        if(val[1]) acc.push(ind+1)
        return acc
    }, [])

    const error = useSelector(state => state.user.error)
    const successReg = useSelector(state => state.user.successReg)
    const loading = useSelector(state => state.user.isLoading)
    const hasAccount = useSelector(state => state.user.hasAccount)
    console.log('email')
    console.log(userData.password)

    const changeData = (event) => {
        dispatch(setSuccess(false))
        dispatch(setUserError(false))
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const changeType = (event) => {
        dispatch(setSuccess(false))
        dispatch(setUserError(false))
        console.log(event.target.value)
        setUserData({...userData, type: event.target.value})
    }

    const changeTopics = (event) => {
        dispatch(setSuccess(false))
        setUserData({...userData, topics: {...userData.topics, [event.target.name]: event.target.checked}})
    }

    const changeHasAccount = (value) => {
        setUserData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            type: '0',
            link: '',
            topics: {
            typo: false,
                dev: false,
                model: false,
                photo: false,
                edu: false,
                img: false
        }});
        dispatch(setSuccess(false))
        dispatch(setHasAccount(value))
        dispatch(setUserError(false))
    }

    const variants = [
        {label: 'Типографика', name: 'typo', icon: <TextFieldsIcon />, active: <TextFieldsIcon color='success'/>},
        {label: 'Программирование', name: 'dev', icon: <CodeIcon />, active: <CodeIcon color='success'/>},
        {label: '3D-моделирование', name: 'model', icon: <ThreeDRotationIcon />, active: <ThreeDRotationIcon color='success'/>},
        {label: 'Фотография', name: 'photo', icon: <PhotoCameraIcon />, active: <PhotoCameraIcon color='success'/>},
        {label: 'Образование', name: 'edu', icon: <SchoolIcon />, active: <SchoolIcon color='success'/>},
        {label: 'Графика', name: 'img', icon: <CreateIcon />, active: <CreateIcon color='success'/>},
    ]

    const sendForm = (event) => {
        event.preventDefault()
        //будет обработка с помощью промиса, отправка по axios
        if(hasAccount){
            dispatch(authUserThunkCreator({
                username: userData.email,
                password: userData.password,
            }))
        } else {
            dispatch(registerUserThunkCreator({
                firstName: userData.firstName,
                lastName: userData.lastName,
                type: userData.type,
                username: userData.email,
                password: userData.password,
                topics: topicsArr
            }))
        }
    }
    return (
        <>
            <Box
                component="div"
                sx={{
                    gridRow: '1 / span 1',
                    gridColumn: '3 / span 8',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridColumnGap: '20px',
                    p: '20px'
                }}
                noValidate
                autoComplete="on"
            >
                <Button
                    variant={hasAccount ? 'outlined' : 'contained'}
                    onClick={() => changeHasAccount(false)}
                    sx={{fontSize: '18px', gridRow: 1, gridColumn: '1 / span 1'}}
                >
                    Зарегистрироваться
                </Button>
                <Button
                    variant={hasAccount ? 'contained' : 'outlined'}
                    onClick={() => changeHasAccount(true)}
                    sx={{fontSize: '18px', gridRow: 1, gridColumn: '2 / span 1', backgroundColor: successReg ? "secondary.main" : "none"}}
                >
                    Войти
                </Button>
            </Box>
            {loading ? (
                <Box sx={{
                    gridRow: '2 / span 8',
                    gridColumn: '3 / span 8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress />
                </Box>)
                :
                hasAccount ?
                    <Box
                        component="form"
                        sx={{
                            gridRow: '2 / span 8',
                            gridColumn: '3 / span 8',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <TextField
                            required
                            id="mail"
                            name='email'
                            value={userData.email}
                            onChange={changeData}
                            label="Электронная почта"
                            type="email"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            required
                            id="password"
                            name='password'
                            value={userData.password}
                            onChange={changeData}
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
                        {error && <Typography sx={{color: 'red', textAlign: "center", p: '10px'}}>Проверьте корректность введенных данных!</Typography>}
                    </Box> :
                    <Box
                        component="form"
                        sx={{
                            gridRow: '2 / span 8',
                            gridColumn: '3 / span 8',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <TextField
                            id="select-type"
                            name='type'
                            required
                            select
                            label="Выберите тип аккаунта"
                            defaultValue={0}
                            value={userData.type}
                            onChange={changeType}
                        >
                            <MenuItem value='0'>
                                Фрилансер
                            </MenuItem>
                            <MenuItem value='1'>
                                Компания
                            </MenuItem>
                        </TextField>
                        <TextField
                            required
                            id="name"
                            name='firstName'
                            label={userData.type === '0' ? 'Имя' : 'Название'}
                            value={userData.firstName}
                            onChange={changeData}
                            defaultValue="Доминик"
                            fullWidth
                            margin="dense"
                        />
                        {userData.type === '0' &&
                        <TextField
                            required
                            id="surname"
                            name='lastName'
                            value={userData.lastName}
                            onChange={changeData}
                            label="Фамилия"
                            defaultValue="Торетто"
                            fullWidth
                            margin="dense"
                        />}
                        <TextField
                            id="portfolio"
                            name='link'
                            onChange={changeData}
                            label={userData.type === 'man' ? "Ссылка на портфолио" : 'Ссылка на сайт'}
                            type="url"
                            fullWidth
                            margin="dense"
                            helperText={userData.type === 'man' ? "Портфолио позволит Вам показать профессионализм и получить одобрение от заказчика" :
                                "Сайт позволит Вам убедить фрилансеров в серьезности своих намерений :)"
                            }
                        />
                        <FormLabel component="legend">
                            Выберите интересующие направления:
                        </FormLabel>
                        <FormGroup sx={{display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "flex-start"}}>
                            {variants.map((item) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={userData.topics[item.name]}
                                            onChange={changeTopics}
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
                            name='email'
                            value={userData.email}
                            onChange={changeData}
                            label="Электронная почта"
                            type="email"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            required
                            id="password"
                            name='password'
                            value={userData.password}
                            onChange={changeData}
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
                        {error && <Typography sx={{color: 'red', textAlign: "center", p: '10px'}}>Проверьте корректность введенных данных!</Typography>}
                        {successReg && <Typography sx={{color: 'green', textAlign: "center", p: '10px'}}>Регистрация успешна! Вы можете войти в систему!</Typography>}
                    </Box>
            }
        </>
    );
};

export default LoginPage;