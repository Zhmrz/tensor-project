import React, {useMemo, useState} from 'react';
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
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CodeIcon from "@mui/icons-material/Code";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SchoolIcon from "@mui/icons-material/School";
import CreateIcon from "@mui/icons-material/Create";
import {changeCompanyData, changeUserData} from "../store/userReducer";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from "@mui/icons-material/Check";
import CustomCheckbox from "./CustomCheckbox";
import CustomFileInput from "./CustomFileInput";


const variants = [
    {id: 1, label: 'Типографика', name: 'typo', icon: <TextFieldsIcon />, active: <TextFieldsIcon />},
    {id: 2, label: 'Программирование', name: 'dev', icon: <CodeIcon />, active: <CodeIcon />},
    {id: 3, label: '3D-моделирование', name: 'model', icon: <ThreeDRotationIcon />, active: <ThreeDRotationIcon />},
    {id: 4, label: 'Фотография', name: 'photo', icon: <PhotoCameraIcon />, active: <PhotoCameraIcon />},
    {id: 5, label: 'Образование', name: 'edu', icon: <SchoolIcon />, active: <SchoolIcon />},
    {id: 6, label: 'Графика', name: 'img', icon: <CreateIcon />, active: <CreateIcon />},
]

const EditUserDataModal = ({visible, setVisible, type}) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.me)
    const [newUserData, setNewUserData] = useState(userData);

    const [activeChanges, setActiveChanges] = useState({
        first_name: false,
        last_name: false,
        description: false,
        link_to_resume: false,
        topics: false,
    })

    const error = useSelector(state => state.user.status.error)
    const success = useSelector(state => state.user.status.successUpd)

    const sections = [
        {id: 1, label: type ? 'Название' : 'Имя', title: 'Изменить имя пользователя', field: 'first_name', type: 'text'},
        (!type) && {id: 2, label: 'Фамилия', title: 'Изменить фамилию пользователя', field: 'last_name', type: 'text'},
        {id: 3, label: 'Описание', title: 'Изменить описание пользователя', field: 'description', type: 'text'},
        {id: 4, label: 'Ссылка', title: 'Изменить ссылку на сайт', field: 'link_to_resume', type: 'url'},
    ]
    const [open, setOpen] = useState(0)

    const sendForm = (e) => {
        e.preventDefault()
        if(type){
            dispatch(changeCompanyData(userData.id, newUserData))
        } else {
            dispatch(changeUserData(userData.id, newUserData))
        }
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
                        id="submit"
                        type="submit"
                        fullWidth
                        margin="dense"
                        onClick={sendForm}
                    />
                    {error && <Typography sx={{color: 'red', textAlign: 'center'}}>Ошибка при обновлении данных пользователя!</Typography>}
                    {success && <Typography sx={{color: 'success.main', textAlign: 'center'}}>Данные успешно обновлены!</Typography>}
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUserDataModal;