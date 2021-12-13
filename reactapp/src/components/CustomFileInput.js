import React, {useState} from 'react';
import {Box, Button, IconButton, Input} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {setUserError} from "../store/userReducer";
import {useDispatch} from "react-redux";

const CustomFileInput = ({mainLabel, action, actionLabel, withClear, formData}) => {
    const dispatch = useDispatch()
    let file = 0
    const cancel = (e) => {
        e.preventDefault()
        formData.delete('file')
    }
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', p: '8px 16px'}}>
            {withClear &&
            <Box>
                <Box sx={{display: 'inline-block', mr: '10px'}}>
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                            {mainLabel}
                        </Button>
                    </label>
                    <Input
                        inputProps={{accept: "image/*"}}
                        id="contained-button-file"
                        type="file"
                        onChange={(e, value) => {
                            dispatch(setUserError(false))
                            formData.set('file', e.target.files[0])
                            file = 1
                        }}
                        sx={{display: 'none'}}
                    />
                </Box>
                <span>
                    {file ? 'Файл загружен!' : 'Файл не загружен!'}
                </span>
            </Box>
            }
            <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: "center", width: '50%', ml: '10px'}}>
                {withClear &&
                <Button variant="outlined" startIcon={<DeleteIcon sx={{fontSize: '24px'}}/>} onClick={(e) => cancel(e)}>
                    Очистить
                </Button>}
                <Button variant="outlined" startIcon={<SendIcon sx={{fontSize: '24px'}}/>} onClick={(e) => action(e, formData)}>
                    {actionLabel}
                </Button>
            </Box>
        </Box>
    );
};

export default CustomFileInput;