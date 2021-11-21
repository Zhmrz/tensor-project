import React from 'react';
import {Slider, Typography} from "@mui/material";

const CustomSlider = ({val, set, min, max, label}) => {
    const change = (event, newValue) => {
        set(newValue);
    };
    return (
        <div>
            <Typography>
                {label}
            </Typography>
            <Slider
                getAriaLabel={() => label}
                value={val}
                min={min}
                max={max}
                onChange={change}
                valueLabelDisplay="auto"
                getAriaValueText={''}
                sx={{mt: '10px'}}
            />
        </div>
    );
};

export default CustomSlider;