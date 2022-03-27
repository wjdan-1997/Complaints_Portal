import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import CreateCompalint from './Modules/Compalints/Pages/CreateCompalintPage';
import Login from './Modules/UserAuthentication/LogIn/page/LoginPage';
import CustomerRegisterion from './Modules/UserAuthentication/Registerions/Pages/UserRegisterionPage';
import ViewComplaints from './Modules/Compalints/Pages/ViewComplaintsPage';
import Compalint from './Modules/Compalints/Pages/Complaint';
import { getCurrentUser, getUserInfo } from './Core/Component/useLocalStorage';

import LoginNavbar from './Core/Component/LoginNavbar';
import NavbarComplaints from './Core/Component/NavbarComplaints';
import i18n from './Core/Contexts/Translate/i18nextInit';
import { useTranslation } from 'react-i18next';
import ViewUsers from './Modules/Users/Pages/ViewUsers';
import NewUser from './Modules/Users/Pages/Users';
import UserProfile from './Modules/Users/Pages/UserProfile';
import EditUser from './Modules/Users/Pages/EditUser';
import ChangePassword from './Modules/UserAuthentication/ChangePassword/Pages/ChangePassword';
import EditProfile from './Modules/Users/Pages/EditProfile';
const App = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  console.log('appp first');
  const isUserLogin = getCurrentUser().name;
  console.log("App =========================== !isLogin", !isUserLogin);
  return (

    <>
      {!isUserLogin ? (
        <LoginNavbar />
      ) : (
        <NavbarComplaints />
      )}

      <Routes>
        <Route path='/' element={!isUserLogin ? (<Login />) : (<ViewComplaints />)} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<CustomerRegisterion />} />
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/editProfile' element={<EditProfile/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/users' element={<ViewUsers />} /> 
        <Route path='/newUser' element={<NewUser />} />
        <Route path='/editUser' element={<EditUser/>}/>


        <Route path='/complaint/new' element={<CreateCompalint />} />
        <Route path='/complaint/edit' element={<CreateCompalint />} />
        <Route path='/complaint' element={<Compalint />} />
      </Routes>
    </>

  )

}
export default App;
