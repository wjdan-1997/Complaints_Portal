import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";

import { Badge, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LanguageIcon from '@mui/icons-material/Language';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { getCurrentUser, userLogout } from './useLocalStorage';
import i18nextInit from '../../Core/Contexts/Translate/i18nextInit'
import Logo from './Logo';
const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { role, name } = getCurrentUser()
    const [t] = useTranslation('common')
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleClick = (lang) => {
        console.log(`Changed to ${lang}`);
        i18nextInit.changeLanguage(lang)
    };
    const handleLogout = () => {
        userLogout()
    };
    const drawer = (
        <div><Logo />
            <Toolbar />
            
            <br />
            <br />
            <br />
            <ListItem >
                <ListItemIcon>
                    < PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
            <Divider />
            <List>

                <ListItem button component={Link} to="/users">
                    <ListItemIcon>
                        < GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("view_all_users")} />
                </ListItem>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("view_all_complaint")} />
                </ListItem>
                <ListItem button onClick={() => handleLogout()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Sign_Out")} />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#1f7d4c',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <Grid container
                        alignItems="center">
                        <Grid item>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#f2f2f2'
                                    }
                                }}

                            >{t('title')}
                            </Typography>
                        </Grid>
                        <Grid item sm></Grid>
                        <Grid item>
                            {
                                role == 'admin' ? (
                                    ''
                                ) : (<FormControl variant="outlined">
                                    <InputLabel >{t('account')}
                                    </InputLabel>
                                    <Select sx={{ borderRadius: 2, color: 'success.dark', borderColor: 'white', width: 100, paddingTop: '4px', marginRight: '8px' }}>

                                        <MenuItem component="a" href="/userProfile">{t('profile')}
                                            <IconButton>
                                                <Badge>
                                                    <ManageAccountsIcon fontSize="small" />
                                                </Badge>
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem component="a" href="/changePassword">{t('change_password')}
                                            <IconButton>
                                                <Badge>
                                                    <PublishedWithChangesIcon fontSize="small" />
                                                </Badge>
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem component="a" href="/signin" onClick={() => handleLogout()}> {t("Sign_Out")}
                                            <IconButton>
                                                <Badge>
                                                    <LogoutIcon fontSize="small" />
                                                </Badge>
                                            </IconButton>
                                        </MenuItem>
                                    </Select>
                                </FormControl>)
                            }


                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="select-multiple-chip"> {t('languages')}</InputLabel>
                                <Select sx={{ borderRadius: 2, color: 'black', borderColor: 'white', width: 100, paddingTop: '4px', marginRight: '8px' }}>

                                    <MenuItem sx={{ backgroundColor: '#fafafa' }} onClick={() => handleClick('ar')}>{t('ar')}</MenuItem>
                                    <MenuItem onClick={() => handleClick('en')} >{t('en')}</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />


            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
