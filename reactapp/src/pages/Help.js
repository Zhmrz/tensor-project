import React, {useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';
import ListItemButton from '@mui/material/ListItemButton';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import LockIcon from '@mui/icons-material/Lock';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import styled from "styled-components";

const ListWrapper = styled(List)`
    grid-column: 1 / span 10;
    grid-row: 2 / span 8;
`

const Help = () => {
    const [open, setOpen] = useState(0)
    const questions = [
        {id: 1, question: 'Что такое фриланс?', answer: 'Фриланс (от англ. слова «freelance») означает работу вне штата компаний. Фрилансеров привлекают для выполнения разовых проектов, за которые они получают оплату. Например, сделать сайт, смонтировать видеоролик, написать тексты для сайта.', icon: <ManageAccountsIcon />},
        {id: 2, question: 'Как определяется уровень оплаты за задание?', answer: 'Уровень оплаты определяется заказчиком лично, при этом ему доступна информация об усредненных ценах в выбранной категории.', icon: <MonetizationOnIcon />},
        {id: 3, question: 'Почему я не могу войти под своим паролем?', answer: 'Проверьте правильность ввода пароля и повторите попытку, иначе напишите в службу поддержки.', icon: <LockIcon />},
        {id: 4, question: 'Зачем указывать портфолио?', answer: 'Портфолио играет большую роль для фрилансера. Многие заказчики выбирают исполнителя по уровню портфолио и качеству работ, которые в нем представлены.', icon: <WorkIcon />},
        {id: 5, question: 'Могу ли я указать несколько специализаций?', answer: 'Конечно! Вы можете быть специалистом в разных областях. В рекомендациях Вам будут показаны задания, соответствующие выбранным специализациям.', icon: <AutoAwesomeMotionIcon />},
        {id: 6, question: 'От чего зависит мой рейтинг?', answer: 'Рейтинг фрилансера определяется на основании соотношения "цена/качество", а рейтинг компании - на основе своевременности и полноты оплаты.', icon: <EqualizerIcon />}
    ]
    return (
        <>
            <ListWrapper
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="div"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Наиболее частые вопросы
                    </ListSubheader>
                }
            >
                {questions.map(item => (
                    <>
                    <ListItemButton divider onClick={() => setOpen(open === item.id ? 0 : item.id)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.question} />
                        {open === item.id ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton >
                    <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                        <ListItem sx={{ pl: 4, bgcolor: 'info.main'  }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={item.answer}  />
                        </ListItem>
                    </Collapse>
                    </>
                ))}
            </ListWrapper>
        </>
    );
};

export default Help;