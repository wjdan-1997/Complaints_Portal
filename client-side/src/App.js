import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import CreateCompalint from './Modules/Compalints/Pages/CreateCompalintPage';
import Login from './Modules/UserAuthentication/LogIn/page/LoginPage';
import CustomerRegisterion from './Modules/UserAuthentication/Registerions/Pages/UserRegisterionPage';
import ViewComplaints from './Modules/Compalints/Pages/ViewComplaintsPage';
import Compalint from './Modules/Compalints/Pages/Complaint';
import { getCurrentUser, getUserInfo } from './Core/Components/useLocalStorage';

import LoginNavbar from './Core/Components/LoginNavbar';
import NavbarComplaints from './Core/Components/NavbarComplaints';
import i18n from './Core/Contexts/Translate/i18nextInit';
import { useTranslation } from 'react-i18next';
import ViewUsers from './Modules/Users/Pages/ViewUsers';
import NewUser from './Modules/Users/Pages/Users';
import UserProfile from './Modules/Users/Pages/UserProfile';
import EditUser from './Modules/Users/Pages/EditUser';
import ChangePassword from './Modules/UserAuthentication/ChangePassword/Pages/ChangePassword';
import EditProfile from './Modules/Users/Pages/EditProfile';
import SideMenu from './Core/Components/SideMenu';
import Header from './Core/Components/Header';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { createTheme,ThemeProvider, styled } from '@mui/material/styles';

  //
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1f7d4c",
        light: '#3c44b126'
      },
      secondary: {
        main: "#548947",
        light: '#f8324526'
      },
      error:{
        main: "#f7342f",
      },
      background: {
        default: "#f4f5fd"
      },
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    }
  })
  
  
  const useStyles = makeStyles({
    appMain: {
      paddingLeft: '320px',
      width: 'auto'
    }
  })
  //
const App = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  console.log('appp first');
  const isUserLogin = getCurrentUser().name;
  console.log("App =========================== !isLogin", !isUserLogin);



  return (

    <ThemeProvider theme={theme}>
   <SideMenu />
   <div className={classes.appMain}>

        {!isUserLogin ? (
          <LoginNavbar />
        ) : (
          <Header/>
        )}

        <Routes>
          <Route path='/' element={!isUserLogin ? (<Login />) : (<ViewComplaints />)} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<CustomerRegisterion />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/users' element={<ViewUsers />} />
          <Route path='/newUser' element={<NewUser />} />
          <Route path='/editUser' element={<EditUser />} />


          <Route path='/complaint/new' element={<CreateCompalint />} />
          <Route path='/complaint/edit' element={<CreateCompalint />} />
          <Route path='/complaint' element={<Compalint />} />
        </Routes>
   </div>
     
    </ThemeProvider>


  )

}
export default App;
