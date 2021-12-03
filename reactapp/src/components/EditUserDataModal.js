import React, {useState} from 'react';
import {
    Box,
    IconButton, Input,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditUserDataModal = ({visible, setVisible}) => {
    const [userData, setUserData] = useState({
        type: '0',
        password: '',
        firstName: '',
        lastName: '',
        link: '',
        img: '',
        topics: []
    });

    const changeData = (e) => {
        setUserData({[e.target.name]: e.target.value})
    }
     const sendForm = (e) => {
        e.preventDefault()
     }
    return (
        <Modal
            open={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="edit-data-title"
            aria-describedby="edit-data-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '70%', height: '80%', backgroundColor: 'white', p: '0'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '10%', backgroundColor: 'secondary.main', p: '0 20px'}}>
                    <Typography variant="h2" component="h2" sx={{fontSize: '24px'}}>
                        Редактировать данные пользователя
                    </Typography>
                    <IconButton area-label='close' onClick={() => setVisible(false)}>
                        <CloseIcon sx={{fontSize: '24px'}}/>
                    </IconButton>
                </Box>
                <Box sx={{p: '0 20px'}}>
                    'first_name',
                    'last_name',
                    'description',
                    'image',
                    'link_to_resume',
                    'topics - специализация')
                    пароль изменить
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        id="name"
                        name='firstName'
                        label={userData.type === '0' ? 'Имя' : 'Название'}
                        value={userData.firstName}
                        onChange={changeData}
                        defaultValue={userData.type === '0' ? 'Доминик' : 'Тензор'}
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
                        id="password"
                        name='password'
                        value={userData.password}
                        onChange={changeData}
                        label="Введите текущий пароль"
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
                    <Input type='file'>Загрузите Вашу фотографию</Input>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUserDataModal;