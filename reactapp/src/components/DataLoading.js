import React from 'react';
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const DataLoading = () => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
            <CircularProgress />
        </Box>
    );
};

export default DataLoading;