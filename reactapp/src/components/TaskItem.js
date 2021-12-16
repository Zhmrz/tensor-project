import React from 'react';
import {IconButton, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import BusinessIcon from '@mui/icons-material/Business';
import Tooltip from '@mui/material/Tooltip';
import {Link} from "react-router-dom";
import {variants} from "../data/commonData";

//item = ('id', 'customer', 'title', 'description', 'price','deadline', 'status', 'performer', 'publication_date', 'topic')
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
                <Tooltip title="На страницу компании" placement="bottom">
                    <Link to={'/company/' + item.customer_id}>
                        <BusinessIcon sx={{fontSize: '28px', color: 'primary.main'}} />
                    </Link>
                </Tooltip>
            </ListItemIcon>
            <ListItemText primary={item.title} secondary={item.customer} secondaryTypographyProps={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: "nowrap"}} sx={{height: '100%', width: '60%', mr: '10px'}}/>
            <ListItemText primary={'Категория:'} secondary={variants[item.topic - 1].label} sx={{height: '100%', width: '10%', minWidth: '150px', ml: '10px'}}/>
            <ListItemText primary={'Цена:'} secondary={item.price} sx={{height: '100%', width: '10%', minWidth: '70px', ml: '10px'}}/>
            <ListItemText primary={'Сроки:'} secondary={item.deadline} sx={{height: '100%', width: '10%', minWidth: '70px', ml: '10px'}}/>
            <ListItemText primary={'Опубликован:'} secondary={item.publication_date} sx={{height: '100%', width: '10%', minWidth: '70px', ml: '10px', mr: '10px'}}/>
        </ListItem>
    );
};

export default TaskItem;