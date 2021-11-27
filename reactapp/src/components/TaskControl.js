import React from 'react';
import {Box, IconButton, Slider, Typography, TextField, RadioGroup, Radio} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styled from 'styled-components';

const FormWrapper = styled.div`
    width: 100%;
    padding: 10px 20px;
    display: grid;
    grid-template-rows: 50px 50px;
    grid-template-columns: 1fr 1fr 120px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
`

const SortWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border: 2px solid grey;
    border-radius: 50px;
    grid-column: ${props => props.column};
    grid-row: ${props => props.row};
`

const TaskControl = ({setPriceLims, priceLims, setDurationLims, durLims, up, setUp, addOptions, sortType, setSort, checked, setChecked}) => {
    const changeSortType = (event) => {
        setSort(event.target.value)
    }
    const changeChecked = (event) => {
        setChecked({...checked, [event.target.value]: event.target.checked})
        console.log(checked)
    }
    const categories = [
        {id: 1, value: 'code', label: 'Программирование'},
        {id: 1, value: 'model', label: '3D-моделирование'},
        {id: 1, value: 'photo', label: 'Фотография'},
        {id: 1, value: 'typo', label: 'Типографика'},
        {id: 1, value: 'edu', label: 'Образование'},
        {id: 1, value: 'img', label: 'Графика'},
    ]
    return (
        <FormWrapper sx={{gridColumn: '1 /span 1', gridRow: '1 / span 1'}}>
            <TextField id="input" label="Введите что-нибудь" variant="standard" sx={{width: '90%'}}/>
            <FormControl component="fieldset" sx={{gridColumn: '2 /span 1', gridRow: '1 / span 1'}}>
                <FormLabel component="legend">Параметр сортировки</FormLabel>
                <RadioGroup
                    row
                    aria-label="sorttype"
                    name="row-radio-buttons-group"
                    value={sortType}
                    onChange={changeSortType}
                >
                    <FormControlLabel value="price" control={<Radio />} label="Стоимость" />
                    <FormControlLabel value="duration" control={<Radio />} label="Срок выполнения" />
                    <FormControlLabel value="date" control={<Radio />} label="Дата опубликования" />
                </RadioGroup>
            </FormControl>
            <SortWrapper column='3 /span 1' row='1 / span 1'>
                <IconButton aria-label="price-up" onClick={() => setUp(true)}>
                    <ArrowCircleUpIcon sx={{fontSize: '34px', color: up ? 'secondary.main' : 'primary.main'}}/>
                </IconButton>
                <IconButton aria-label="price-down" onClick={() => setUp(false)}>
                    <ArrowCircleDownIcon sx={{fontSize: '34px', color: !up ? 'secondary.main' : 'primary.main'}}/>
                </IconButton>
            </SortWrapper>
            <Box />
            <FormControl component="fieldset" sx={{gridColumn: '1 /span 2', gridRow: '2 / span 1'}}>
                <FormLabel component="legend">Выберите категории</FormLabel>
                <FormGroup
                    aria-label="category"
                    row
                    checked={checked}
                    onChange={changeChecked}
                >
                    {categories.map(item => (
                        <FormControlLabel
                            id={item.id}
                            value={item.value}
                            control={<Checkbox />}
                            label={item.label}
                            labelPlacement="end"
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <SortWrapper column='3 /span 1' row='2 / span 1'>
                <IconButton aria-label="cancel" onClick={() => console.log('default')}>
                    <CancelIcon sx={{fontSize: '34px'}}/>
                </IconButton>
                <IconButton aria-label='add-options' onClick={() => addOptions(true)}>
                    <FilterAltIcon sx={{fontSize: '34px'}}/>
                </IconButton>
            </SortWrapper>
        </FormWrapper>
    );
};

export default TaskControl;