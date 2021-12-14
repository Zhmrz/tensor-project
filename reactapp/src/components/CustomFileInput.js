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


const CustomFileInput = ({action, actionLabel, withInput, formData, forImg}) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState('')
    //const [loaded, setLoaded] = useState(false)
    /*
    const cancel = (e) => {
        e.preventDefault()
        formData.delete('file')
        setFile('')
    }*/
    formData.set('file', file)
    console.log(formData.has('file'))
    console.log(file)
    return (
        <Box sx={{display: 'flex', justifyContent: withInput ? 'space-between' : 'flex-end', alignItems: 'center', p: '8px 16px'}}>
            {withInput &&
            <Box sx={{mr: '10px'}}>
                <FileInput
                    type="file"
                    accept={forImg ? "image/*" : '*'}
                    onChange={(e, value) => {
                        dispatch(setUserError(false))
                        setFile(e.target.files[0])
                    }}
                />
            </Box>
            }
            <Box sx={{ml: '10px'}}>
                <Button variant="outlined" startIcon={<SendIcon sx={{fontSize: '24px'}}/>} onClick={(e) => action(e, formData)}>
                    {actionLabel}
                </Button>
            </Box>
        </Box>
    );
};

export default CustomFileInput;