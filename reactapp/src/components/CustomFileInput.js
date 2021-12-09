import React, {useState} from 'react';
import {Box, Button, IconButton, Input} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const CustomFileInput = ({label, defVal, cancel, approve}) => {
    const [value, setValue] = useState(defVal)
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '8px 16px'}}>
            <Box>
                <Box sx={{display: 'inline-block', mr: '10px'}}>
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                            {label}
                        </Button>
                    </label>
                    <Input
                        inputProps={{accept: "image/*"}}
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => setValue(e.target.value)}
                        sx={{display: 'none'}}
                    />
                </Box>
                <span>
                    {defVal === value ? defVal : value}
                </span>
            </Box>
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

export default CustomFileInput;