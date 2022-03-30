import React from 'react'
import { Box, AppBar, Typography, Toolbar, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

import { useTranslation } from 'react-i18next';
import i18nextInit from '../Contexts/Translate/i18nextInit'
import { getCurrentUser, userLogout } from './useLocalStorage';
import LoginIcon from '@mui/icons-material/Login';
export default function LoginNavbar() {
    console.log('seconde or third');
    const [t] = useTranslation('common')
    const isUserLogin = getCurrentUser().name;
    // console.log("!!isLogin", !isUserLogin);


    const buttonStyle = {
        position: "relative",
        textTransform: 'none',
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                backgroundColor: '#1f7d4c',
            }} position="static" >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t('title')}
                    </Typography>



                    <Button
                        href="/signin"
                        startIcon={<LoginIcon/>}
                        style={buttonStyle}
                    >
                        {t("login")}
                    </Button>
                    <Grid item>
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="select-multiple-chip"> {t('languages')}</InputLabel>
                            <Select sx={{ borderRadius: 2, color: 'black', borderColor: 'white', width: 100, paddingTop: '4px', marginRight: '8px' }}>

                                <MenuItem sx={{ backgroundColor: '#fafafa' }} onClick={() => handleClick('ar')}>{t('ar')}</MenuItem>
                                <MenuItem onClick={() => handleClick('en')} >{t('en')}</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
