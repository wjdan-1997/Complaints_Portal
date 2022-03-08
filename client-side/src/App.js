import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import CreateCompalint from './Modules/Compalints/Pages/CreateCompalintPage';
import Login from './Modules/UserAuthentication/LogIn/page/LoginPage';
import AdminRegisterion from './Modules/UserAuthentication/Registerions/Pages/AdminRegisterionPage';
import CustomerRegisterion from './Modules/UserAuthentication/Registerions/Pages/UserRegisterionPage';
import ViewComplaints from './Modules/Compalints/Pages/ViewComplaintsPage';
import Compalint from './Modules/Compalints/Pages/Complaint';
import { handleUserLogin } from './Core/Component/useLocalStorage';

import { Grid } from '@mui/material';
import LoginNavbar from './Core/Component/LoginNavbar';
import PrimaryAppBar from './Core/Component/NavbarComplaints';
import NavbarComplaints from './Core/Component/NavbarComplaints';
const App = () => {
  const navigate = useNavigate()
  console.log('appp first');
  const isUserLogin = handleUserLogin().name;
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
        <Route path='/signupAdmin' element={<AdminRegisterion />} />
        <Route path='/complaint/new' element={<CreateCompalint />} />
        <Route path='/complaint/edit' element={<CreateCompalint />} />
        <Route path='/complaint' element={<Compalint />} />
      </Routes>
    </>

  )

}
export default App;
