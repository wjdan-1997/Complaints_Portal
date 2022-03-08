import { Navigate, Outlet } from 'react-router-dom';
import CreateCompalint from './Modules/Compalints/Pages/CreateCompalintPage';
import Login from './Modules/UserAuthentication/LogIn/page/LoginPage';
import AdminRegisterion from './Modules/UserAuthentication/Registerions/Pages/AdminRegisterionPage';
import CustomerRegisterion from './Modules/UserAuthentication/Registerions/Pages/UserRegisterionPage';
import ViewComplaints from './Modules/Compalints/Pages/ViewComplaintsPage';
import Compalint from './Modules/Compalints/Pages/Complaint';
import { handleUserLogin } from './Core/Component/useLocalStorage';
import LoginNavbar from './Core/Component/LoginNavbar';
import NavbarComplaints from './Core/Component/NavbarComplaints';
console.log('++++++++++++++++');
const routes = (isLoggedIn) => [
    {
        element: <LoginNavbar />,
        children: [
            { path: 'signin', element: <Login /> },
            { path: '/signup', element: <CustomerRegisterion /> },
            { path: '/signupAdmin', element: <AdminRegisterion /> },
        ],
    },
    {
        element:<NavbarComplaints/>,
        children:[
            { path: '/', element: <ViewComplaints /> },
            { path: 'complaint/new', element: <CreateCompalint /> },
            { path: 'complaint', element: <Compalint /> },
        ]
    }
    // {path: '/', element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />},

];

// {
//     path: '/',
//     element: isLoggedIn ? <CreateCompalint /> : <Navigate to="/signin" />,
//     children: [
//       { path: 'complaint/new', element: <CreateCompalint /> },
//       { path: 'complaint', element: <Compalint /> },

//     ],
//   },
export default routes;