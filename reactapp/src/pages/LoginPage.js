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
    regSuccess
} from "../store/userReducer";
import {useDispatch, useSelector} from "react-redux";
import {setUserError} from "../store/userReducer";


const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const urlRegex = new RegExp('[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)')
const nameRegex = new RegExp('^[а-яА-ЯёЁ0-9a-zA-Z]+$')

const variants = [
    {id: 1, label: 'Типографика', name: 'typo', icon: <TextFieldsIcon />, active: <TextFieldsIcon />},
    {id: 2, label: 'Программирование', name: 'dev', icon: <CodeIcon />, active: <CodeIcon />},
    {id: 3, label: '3D-моделирование', name: 'model', icon: <ThreeDRotationIcon />, active: <ThreeDRotationIcon />},
    {id: 4, label: 'Фотография', name: 'photo', icon: <PhotoCameraIcon />, active: <PhotoCameraIcon />},
    {id: 5, label: 'Образование', name: 'edu', icon: <SchoolIcon />, active: <SchoolIcon />},
    {id: 6, label: 'Графика', name: 'img', icon: <CreateIcon />, active: <CreateIcon />},
]



const LoginPage = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        username: '', //email
        password: '',
        first_name: '',
        last_name: '',
        user_type: '0',
        link_to_resume: '',
        topics: []
    })

    const error = useSelector(state => state.user.status.error)
    const successReg = useSelector(state => state.user.status.successReg)
    const loading = useSelector(state => state.user.status.isLoading)
    const hasAccount = useSelector(state => state.user.status.hasAccount)

    const changeData = (event) => {
        dispatch(regSuccess(false))
        dispatch(setUserError(false))
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const changeType = (event) => {
        dispatch(regSuccess(false))
        dispatch(setUserError(false))
        setUserData({...userData, user_type: event.target.value})
    }

    const changeHasAccount = (value) => {
        setUserData({
            username: '', //email
            password: '',
            first_name: '',
            last_name: '',
            user_type: '0',
            link_to_resume: '',
            topics: []
        });
        dispatch(regSuccess(false))
        dispatch(setHasAccount(value))
        dispatch(setUserError(false))
    }

    const changeTopics = (event, id) => {
        dispatch(regSuccess(false))
        if(userData.topics.includes(id)){
            setUserData({...userData, topics: userData.topics.filter(item => item !== id)})
        } else {
            setUserData({...userData, topics: [...userData.topics, id]})
        }
    }

    const sendForm = (event) => {
        event.preventDefault()
        //будет обработка с помощью промиса, отправка по axios
        if(hasAccount){
            dispatch(authUserThunkCreator({
                username: userData.username,
                password: userData.password,
            }))
        } else {
            dispatch(registerUserThunkCreator(userData))
        }
    }

    const validationErrors = {
        name: false,
        surname: false,
        username: false,
        url: false,
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
                            name='username'
                            value={userData.username}
                            onChange={changeData}
                            label="Электронная почта"
                            type="email"
                            fullWidth
                            margin="dense"
                            error={false}
                            helperText={'Текст'}
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
                            name='user_type'
                            required
                            select
                            label="Выберите тип аккаунта"
                            defaultValue={'0'}
                            value={userData.user_type}
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
                            name='first_name'
                            label={userData.user_type === '0' ? 'Имя' : 'Название'}
                            value={userData.first_name}
                            onChange={changeData}
                            defaultValue={userData.user_type === '0' ? 'Доминик' : 'Тензор'}
                            fullWidth
                            margin="dense"
                        />
                        {userData.user_type === '0' &&
                        <TextField
                            required
                            name='last_name'
                            value={userData.last_name}
                            onChange={changeData}
                            label="Фамилия"
                            defaultValue="Торетто"
                            fullWidth
                            margin="dense"
                        />}
                        <TextField
                            name='link_to_resume'
                            onChange={changeData}
                            label={userData.user_type === 'man' ? "Ссылка на портфолио" : 'Ссылка на сайт'}
                            type="url"
                            fullWidth
                            margin="dense"
                            helperText={userData.user_type === 'man' ? "Портфолио позволит Вам показать профессионализм и получить одобрение от заказчика" :
                                "Сайт позволит Вам убедить фрилансеров в серьезности своих намерений :)"
                            }
                        />
                        <FormLabel component="legend">
                            Выберите интересующие направления:
                        </FormLabel>
                        <FormGroup sx={{display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "flex-start"}}>
                            {variants.map((item) => (
                                <FormControlLabel
                                    key={item.name}
                                    control={
                                        <Checkbox
                                            checked={userData.topics.includes(item.id)}
                                            onChange={e => changeTopics(e, item.id)}
                                            name={item.name}
                                            icon={item.icon}
                                            checkedIcon={item.active}
                                            sx={{
                                                backgroundColor: userData.topics.includes(item.id) ? 'secondary.main' : 'none'
                                            }}
                                        />
                                    }
                                    label={item.label}
                                    sx={{width: "30%"}}
                                />
                            ))}
                        </FormGroup>
                        <TextField
                            required
                            name='username'
                            value={userData.username}
                            onChange={changeData}
                            label="Электронная почта"
                            type="email"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            required
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