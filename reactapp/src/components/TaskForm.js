import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const TaskForm = ({order, setOrder, sendForm, readOnly}) => {
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                justifyContent: 'stretch',
                flexWrap: 'wrap',
                p: '0 2.5%'
            }}
            autoComplete="on"
        >
            <TextField
                InputLabelProps={{ shrink: true }}
                required
                name='title'
                label='Название'
                value={order.title}
                onChange={(e) => setOrder({...order, title: e.target.value})}
                defaultValue='Создать то, не знаю что'
                margin="dense"
                sx={{width: '40%'}}
                type='text'
                InputProps={{
                    readOnly: readOnly,
                }}
            />
            <TextField
                InputLabelProps={{ shrink: true }}
                required
                name='description'
                label='Описание'
                value={order.description}
                onChange={(e) => setOrder({...order, description: e.target.value})}
                defaultValue='Сложно, но возможно'
                margin="dense"
                sx={{width: '60%'}}
                type='text'
            />
            <TextField
                InputLabelProps={{ shrink: true }}
                required
                name='price'
                label='Стоимость (р)'
                value={order.price}
                onChange={(e) => setOrder({...order, price: e.target.value})}
                defaultValue={0}
                margin="dense"
                sx={{width: '20%'}}
                type='number'
            />
            <TextField
                InputLabelProps={{ shrink: true }}
                required
                name='deadline'
                label='Длительность (дней)'
                value={order.deadline}
                onChange={(e) => setOrder({...order, deadline: e.target.value})}
                defaultValue={0}
                margin="dense"
                sx={{width: '20%'}}
                type='number'
            />
            <FormControl
                sx={{width: '30%', mt: '8px'}}
            >
                <InputLabel id="select-label">Категория</InputLabel>
                <Select
                    labelId="select-label"
                    value={order.topic}
                    label="Категория"
                    onChange={(e) => setOrder({...order, topic: e.target.value})}
                    inputProps={{ readOnly: readOnly }}
                >
                    <MenuItem value={1}>Программирование</MenuItem>
                    <MenuItem value={2}>3D-моделирование</MenuItem>
                    <MenuItem value={3}>Фотография</MenuItem>
                    <MenuItem value={4}>Типографика</MenuItem>
                    <MenuItem value={5}>Образование</MenuItem>
                    <MenuItem value={6}>Графика</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                type="submit"
                margin="dense"
                onClick={sendForm}
                sx={{width: '30%'}}
            />
        </Box>
    );
};

export default TaskForm;