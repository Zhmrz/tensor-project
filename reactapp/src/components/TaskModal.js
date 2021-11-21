import React from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import PanToolIcon from '@mui/icons-material/PanTool';
import {Handyman, SendRounded} from "@mui/icons-material";

const TaskModal = ({item, visibleTask, setVisibleTask}) => {
    const task = item ? item : {id: 0, title: 'Noname', body: 'No body'}
    return (
        <Modal
            open={visibleTask}
            onClose={() => setVisibleTask(0)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '50%', backgroundColor: 'white', p: '20px'}}>
                <Typography variant="h2" component="h2">
                    Информация о заказе № {task.id}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                    Название:
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    {task.title}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                    Описание:
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {task.body}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
                    <Button variant="outlined" startIcon={<PanToolIcon sx={{fontSize: '36px', mr: 2}}/>}>
                        Откликнуться
                    </Button>
                    <Button variant="outlined" endIcon={<SendRounded sx={{fontSize: '24px', ml: 2}}/>}>
                        Связаться с автором
                    </Button>
                </Box>

            </Box>
        </Modal>
    );
};

export default TaskModal;