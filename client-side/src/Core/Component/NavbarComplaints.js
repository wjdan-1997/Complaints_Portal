import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Typography,Tab,Tabs, Button} from '@mui/material';
import { userLogout } from './useLocalStorage';

import { useTranslation } from 'react-i18next';
import i18nextInit from '../../Core/Contexts/Translate/i18nextInit'

export default function NavbarComplaints() {
    const [t] = useTranslation('common')
    const propStyle = {
        boxShadow: 'rgb(202 62 219 / 32%) 20px 14px 80px',
        padding: '1px 15px 15px 15px',
    };
    const buttonStyle = {
        position: "relative",
        float: "left",
        color: "white",
        fontSize:'13px',
        width: "10%",
    }
    const handleLogout = () =>{
        userLogout()
    };
    const handleClick = (lang) =>{
        console.log(`Changed to ${lang}`);
        i18nextInit.changeLanguage(lang)
    };
    return (
        <Box style={propStyle} sx={{ flexGrow: 1 }}>
            <AppBar color='secondary' position="static" >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {t('title')}
                    </Typography>
                    <Button href="/complaint/new" style={buttonStyle}>{t("create_complaint")}</Button>
                    <Button href="/" style={buttonStyle}>{t("view_all_complaint")}</Button>
                    <Button href="/signin" style={buttonStyle} onClick={()=> handleLogout()}>{t("Sign_Out")} </Button>
                    
                    <Button size='small' style={buttonStyle}onClick={()=> handleClick('ar') }>Ar</Button>
                    <Button size='small' style={buttonStyle}onClick={()=> handleClick('en') }>En</Button>
                 
                </Toolbar>
            </AppBar>
        </Box>
    );
    
}