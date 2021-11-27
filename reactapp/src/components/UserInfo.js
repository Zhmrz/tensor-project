import React from 'react';
import styled from 'styled-components';
import {Box, Paper, Stack, Typography} from "@mui/material";

const Item = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 50px;
    grid-column-gap: 20px;
    width: 100%;
    height: 60px;
    background-color: ${props => props.backColor ? props.backColor : 'white'};
    border-bottom: ${props => props.bottomColor ? '2px solid ' + props.bottomColor : 'none'};
`

const UserInfo = ({row, column}) => {
    const stats = [
        {id: 1, title: 'Выполнено заказов:', num: 10, toModal: ''},
        {id: 2, title: 'Ожидает проверки:', num: 10, toModal: ''},
        {id: 3, title: 'Заказов в работе:', num: 10, toModal: ''},
        {id: 4, title: 'Отменено заказов:', num: 10, toModal: ''},
        {id: 5, title: 'Отклики:', num: 10, toModal: ''}
    ]
    return (
        <Box sx={{gridRow: row, gridColumn: column}}>
            <Paper elevation={6} sx={{width: '100%', height: '100%'}}>
                <Stack direction="column" spacing={2} sx={{p: '20px'}}>
                    <Typography variant={'h2'} sx={{textAlign: "center"}}>
                        Статистика пользователя:
                    </Typography>
                    {stats.map((item) => (
                        <Item key={item.id} bottomColor='#32384D'>
                            <Typography sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                {item.title}
                            </Typography>
                            <Typography sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                {item.num}
                            </Typography>
                        </Item>
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
};

export default UserInfo;