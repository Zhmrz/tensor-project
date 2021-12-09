import React, {useState} from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const CustomForm = ({label, field, type, defVal, cancel, approve}) => {
    const [value, setValue] = useState(defVal)
    return (
        <Box sx={{display: 'flex', justifyContent: 'stretch', alignItems: 'center', p: '8px 16px'}}>
            <TextField
                InputLabelProps={{ shrink: true }}
                name={field}
                label={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                defaultValue={defVal}
                type={type}
                margin="dense"
                sx={{flexGrow: 1}}
            />
            <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: "center", width: '60px', ml: '10px'}}>
                <IconButton onClick={(e) => cancel(e)}>
                    <ClearIcon sx={{fontSize: '24px'}}/>
                </IconButton>
                <IconButton onClick={(e) => approve(e, value)}>
                    <CheckIcon sx={{fontSize: '24px'}}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default CustomForm;