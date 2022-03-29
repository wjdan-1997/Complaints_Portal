import React from 'react'
import { makeStyles, withStyles } from "@mui/styles";
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';



const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '120%',
        backgroundColor: '#1f7d4c'
    }
}

const SideMenu = (props) => {
    const [t] = useTranslation('common')
    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}

export default withStyles(style)(SideMenu);
