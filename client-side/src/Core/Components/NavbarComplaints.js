import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Tab, Tabs, Button, FormControl, InputLabel, MenuItem, Link } from '@mui/material';
import { getCurrentUser, userLogout } from './useLocalStorage';
import { useTranslation } from 'react-i18next';
import i18nextInit from '../../Core/Contexts/Translate/i18nextInit'
import Select from '@mui/material/Select';

export default function NavbarComplaints() {
    const [t] = useTranslation('common')
    const { role } = getCurrentUser()
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const propStyle = {
        boxShadow: 'rgb(202 62 219 / 32%) 20px 14px 80px',
        padding: '1px 15px 15px 15px',
    };
    const buttonStyle = {
        position: "relative",
        float: "left",
        color: "white",
        textTransform: 'none',
        fontSize: '13px',
        width: "11%"
    }
    const handleLogout = () => {
        console.log('looff')
        userLogout()
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
                    <Button href="/" style={buttonStyle}>{t("view_all_complaint")}</Button>

                    {role == 'admin' ? (
                        <>
                            <Button href="/users" style={buttonStyle}>{t("view_all_users")}</Button>
                            < Button href="/signin" style={buttonStyle} onClick={() => handleLogout()}>{t("Sign_Out")} </Button>
                        </>
                    ) : (
                            <>
                                <Button href="/complaint/new" style={buttonStyle}>{t("create_complaint")}</Button>
                                <div>
                                    <FormControl variant="outlined">
                                        <InputLabel >{t('account')}</InputLabel>
                                        <Select sx={{ borderRadius: 2, color: 'success.dark', borderColor: 'white', width: 100 ,paddingTop:'4px',marginRight:'8px' }}>

                                            <MenuItem component="a" href="/userProfile">{t('profile')}</MenuItem>
                                            <MenuItem component="a" href="/changePassword">{t('change_password')}</MenuItem>
                                            <MenuItem component="a" href="/signin" onClick={() => handleLogout()}>{t("Sign_Out")}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </>

                        )
                    }
                    <div>
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="select-multiple-chip"> {t('languages')}</InputLabel>
                            <Select sx={{ borderRadius: 2, color: 'black',borderColor: 'white', width: 100 ,paddingTop:'4px',marginRight:'8px' }}>

                                <MenuItem sx={{ backgroundColor: '#fafafa' }} onClick={() => handleClick('ar')}>{t('ar')}</MenuItem>
                                <MenuItem onClick={() => handleClick('en')} >{t('en')}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                </Toolbar>
            </AppBar>
        </Box >
    );

}