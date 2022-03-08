import React from 'react'
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';

import { useTranslation } from 'react-i18next';
import i18nextInit from '../Contexts/Translate/i18nextInit'
import { handleUserLogin, userLogout } from './useLocalStorage';

export default function LoginNavbar() {
    console.log('seconde or third');
    const [t] = useTranslation('common')
    const isUserLogin = handleUserLogin().name;
    // console.log("!!isLogin", !isUserLogin);

    const propStyle = {
        boxShadow: 'rgb(202 62 219 / 32%) 20px 14px 80px',
        padding: '10px 15px 15px 15px',
    };
    const buttonStyle = {
        position: "relative",
        float: "left",
        color: "white",
        marginLeft: 0,
        width: "8%",
    };
    const handleClick = (lang) => {
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



                    <Button href="/signin" style={buttonStyle} >{t("login")}</Button>

                    <Button size='small' style={buttonStyle} onClick={() => handleClick('ar')}>Ar</Button>
                    <Button size='small' style={buttonStyle} onClick={() => handleClick('en')}>En</Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
