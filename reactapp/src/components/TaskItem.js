import React from 'react';
import {IconButton, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import StarIcon from "@mui/icons-material/Star";

const TaskItem = ({item, setVisibleTask}) => {
    return (
        <ListItem divider sx={{width: '100%', height: '70px', position: 'relative'}}
                  secondaryAction={
                      <IconButton onClick={() => setVisibleTask(item.id)}>
                          <ControlPointIcon sx={{fontSize: '28px'}}/>
                      </IconButton>
                  }
        >
            <ListItemIcon>
                <StarIcon sx={{fontSize: '28px'}}/>
            </ListItemIcon>
            <ListItemText primary={item.title} secondary={item.body} secondaryTypographyProps={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: "nowrap"}} sx={{height: '100%', width: '60%', mr: '10px'}}/>
            <ListItemText primary={'Категория:'} secondary={item.id} sx={{height: '100%', width: '50px', ml: '10px'}}/>
            <ListItemText primary={'Цена:'} secondary={item.id} sx={{height: '100%', width: '50px', ml: '10px'}}/>
            <ListItemText primary={'Сроки:'} secondary={item.id} sx={{height: '100%', width: '50px', ml: '10px'}}/>
        </ListItem>
    );
};

export default TaskItem;