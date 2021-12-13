import React, {useState} from 'react';
import {Box, Button, IconButton, Input} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {setUserError} from "../store/userReducer";
import {useDispatch} from "react-redux";
import styled from "styled-components";


const FileInput  = styled.input`
    background-color: white;
    color: black;
    height: 20px;
`


const CustomFileInput = ({mainLabel, action, actionLabel, withClear, formData1}) => {
    let formData = new FormData()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const cancel = (e) => {
        e.preventDefault()
        formData.delete('file')
        setLoaded(false)
    }
    console.log(formData)
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '8px 16px'}}>
            {withClear &&
            <Box>
                <Box sx={{display: 'inline-block', mr: '10px'}}>
                    <input
                        type="file"
                        onChange={(e, value) => {
                            dispatch(setUserError(false))
                            console.log(e.target.files[0])
                            formData.set('file', e.target.files[0])
                            setLoaded(true)
                        }}
                    />
                </Box>

            </Box>
            }
            <Box sx={{display: "flex", justifyContent: 'flex-end', alignItems: "center", width: '40%', mx: '10px'}}>
                {withClear &&
                <Button variant="outlined" startIcon={<DeleteIcon sx={{fontSize: '24px', mr: '10px'}}/>} onClick={(e) => cancel(e)}>
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