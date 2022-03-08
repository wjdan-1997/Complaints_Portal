// {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: 'login', element: isLoggedIn === "" ? <Login /> : <Navigate to={navTo} /> },
//       { path: 'otplogin', element: <OTPLogin /> },
//       { path: 'downloadDoc', element: <DownloadDoc /> },
//       { path: 'Home', element: <Home /> },
//       { path: '/about', element: <About /> },
//       { path: '/faq', element: <Faq /> },
//       { path: '/services', element: <Services /> },
//       { path: '/contactus', element: <ContactUs /> },
//       { path: '/forgetpassword', element: <ForgetPassword /> },
//       { path: 'register', element: isLoggedIn === "" ? <Register /> : <Navigate to={navTo} /> },

//       { path: '404', element: <NotFound /> },
//       {
//         path: '/', element: isLoggedIn === "" ? <Navigate to="/home" /> : <Navigate to={navTo} />,
//       },
//       { path: '*', element: <Navigate to="/404" /> }
//     ]
//   },