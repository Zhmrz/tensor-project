import React, {useState} from 'react';
import {Box, Checkbox, FormControlLabel, FormGroup, IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";


const CustomCheckbox = ({defArr, variants, approve, cancel}) => {
    console.log('пришел массив')
    console.log(defArr)
    const [checkedTopics, setCheckedTopics] = useState(defArr)
    const onChange = (event, id) => {
        if(checkedTopics.includes(id)){
            setCheckedTopics(checkedTopics.filter(i => i !== id))
        } else {
            setCheckedTopics([...checkedTopics, id])
        }
    }
    return (
        <Box sx={{display: 'flex', justifyContent: 'stretch', alignItems: 'center', p: '8px 16px'}}>
            <FormGroup sx={{display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "flex-start", flexGrow: 1, ":hover": 'none'}}>
                {variants.map((item) => (
                    <FormControlLabel
                        key={item.id}
                        control={
                            <Checkbox
                                checked={checkedTopics.includes(item.id)}
                                onChange={e => onChange(e, item.id)}
                                name={item.name}
                                icon={item.icon}
                                checkedIcon={item.active}
                                sx={{
                                    backgroundColor: checkedTopics.includes(item.id) ? 'secondary.main' : 'none',
                                }}
                            />
                        }
                        label={item.label}
                        sx={{width: '30%'}}
                    />
                ))}
            </FormGroup>
            <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: "center", width: '60px', ml: '10px', mr: '16px'}}>
                <IconButton onClick={e => cancel(e)}>
                    <ClearIcon sx={{fontSize: '24px'}}/>
                </IconButton>
                <IconButton onClick={e => approve(e, checkedTopics)}>
                    <CheckIcon sx={{fontSize: '24px'}}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default CustomCheckbox;