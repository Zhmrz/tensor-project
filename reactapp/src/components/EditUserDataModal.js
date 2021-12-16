import React, {useEffect, useMemo, useState} from 'react';
import {
    Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel,
    IconButton, Input, List, ListItem, ListItemText,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CustomForm from "./CustomForm";
import {useDispatch, useSelector} from "react-redux";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {changeCash, changeCompanyData, changePhoto, changeUserData} from "../store/userReducer";
import CustomCheckbox from "./CustomCheckbox";
import CustomFileInput from "./CustomFileInput";
import {compSections, userSections, variants} from "../data/commonData";


const EditUserDataModal = ({visible, setVisible, type, userData}) => {
    const dispatch = useDispatch();
    //const [newUserData, setNewUserData] = useState(userData);
    const [newUserData, setNewUserData] = useState(userData)
    const [money, setMoney] = useState(0)
    useEffect(() => {
        setNewUserData(userData)
    }, [userData])
    const [activeChanges, setActiveChanges] = useState({
        first_name: false,
        last_name: false,
        description: false,
        link_to_resume: false,
        topics: false,
    })

    const error = useSelector(state => state.user.status.error)
    const success = useSelector(state => state.user.status.successUpd)

    const sections = type ? compSections : userSections
    const [open, setOpen] = useState(0)

    const sendForm = (e) => {
        e.preventDefault()
        if(type){
            dispatch(changeCompanyData(userData.id, newUserData))
        } else {
            dispatch(changeUserData(userData.id, newUserData))
        }
    }
    const changeUserPhoto = (e, data) => {
        e.preventDefault()
        dispatch(changePhoto(userData.user_type, userData.id, data))
    }

    const changeMoney = (e) => {
        e.preventDefault()
        dispatch(changeCash(type, userData.id, money))
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
                <Box sx={{overflowY: 'scroll', overflowX: 'hidden', height: '90%', p: '10px'}}>
                    {sections.map(item => (
                        <List key={item.id}>
                            <ListItemButton divider onClick={() => setOpen(open === item.id ? 0 : item.id)}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.title}/>
                                {activeChanges[item.field] &&
                                <ListItemIcon>
                                    <DoneOutlineIcon sx={{color: 'success.main'}}/>
                                </ListItemIcon>
                                }
                                {open === item.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton >
                            <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                                <CustomForm
                                    label={item.label}
                                    name={item.field}
                                    defVal={newUserData[item.field]}
                                    cancel={e => {
                                        setNewUserData({...newUserData, [item.field]: userData[item.field]})
                                        setActiveChanges({...activeChanges, [item.field]: false})
                                        setOpen(0)
                                    }}
                                    approve={(e, value) => {
                                        setNewUserData({...newUserData, [item.field]: value})
                                        setActiveChanges({...activeChanges, [item.field]: true})
                                        setOpen(0)
                                    }}
                                />
                            </Collapse>
                        </List>
                    ))}
                    <List>
                        <ListItemButton divider onClick={() => setOpen(open === 6 ? 0 : 6)}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Изменить специализацию'}/>
                            {activeChanges['topics'] &&
                            <ListItemIcon>
                                <DoneOutlineIcon sx={{color: 'success.main'}}/>
                            </ListItemIcon>
                            }
                            {open === 6 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton >
                        <Collapse in={open === 6} timeout="auto" unmountOnExit>
                            <CustomCheckbox
                                variants={variants}
                                defArr={newUserData.topics}
                                cancel={e => {
                                    setNewUserData({...newUserData, topics: userData.topics})
                                    setActiveChanges({...activeChanges, topics: false})
                                    setOpen(0)
                                }}
                                approve={(e, value) => {
                                    setNewUserData({...newUserData, topics: value})
                                    setActiveChanges({...activeChanges, topics: true})
                                    setOpen(0)
                                }}
                            />
                        </Collapse>
                    </List>
                    <TextField
                        required
                        value='Изменить данные'
                        id="submit"
                        type="submit"
                        fullWidth
                        margin="dense"
                        onClick={sendForm}
                    />
                    <Box sx={{p: '0', mt: '10px'}}>
                        <Typography variant="h2" component="h2" sx={{fontSize: '24px'}}>
                            Изменение фотографии профиля
                        </Typography>
                        <CustomFileInput
                            mainLabel='Загрузить файл'
                            actionLabel='Отправить'
                            withInput={true}
                            action={changeUserPhoto}
                            formData={new FormData()}
                            forImg={true}
                        />
                    </Box>
                    <Box sx={{p: '0', mt: '10px'}}>
                        <Typography variant="h2" component="h2" sx={{fontSize: '24px'}}>
                            Операции со счетом:
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                name='price'
                                label='Текущий баланс(р)'
                                value={newUserData.personal_account}
                                defaultValue={newUserData.personal_account}
                                margin="dense"
                                sx={{width: '50%'}}
                                type='number'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                name='price'
                                label='Сколько снять/положить (р)'
                                value={money}
                                onChange={(e) => setMoney(e.target.value)}
                                defaultValue={0}
                                margin="dense"
                                sx={{width: '50%'}}
                                type='number'
                                inputProps={{
                                    min: -newUserData.personal_account,
                                }}
                            />
                        </Box>
                        <TextField
                            required
                            value='Изменить баланс счета'
                            id="submit"
                            type="submit"
                            fullWidth
                            margin="dense"
                            onClick={changeMoney}
                        />
                    </Box>
                    <Box sx={{p: '0', mt: '10px'}}>
                        {error && <Typography sx={{color: 'red', textAlign: 'center'}}>Ошибка при обновлении данных пользователя!</Typography>}
                        {success && <Typography sx={{color: 'success.main', textAlign: 'center'}}>Данные успешно обновлены!</Typography>}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUserDataModal;