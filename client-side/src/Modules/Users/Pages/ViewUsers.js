import * as React from 'react';
import { useEffect, useState } from 'react';

import { Divider, CardContent, CircularProgress, Button, Card, Paper, Container, Typography, Toolbar } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddBoxIcon from '@mui/icons-material/AddBox';
//
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from '../../../Core/Components/useLocalStorage';
import { ApiDeleteRequest, ApiGetRequest } from '../../../Core/API/ApiRequest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { useTheme } from '@mui/material/styles';
import PageHeader from '../../../Core/Components/PageHeader';
import Popup from '../../../Core/Components/PopupForm/Popup';
import EditProfile from './EditProfile';
import EditUser from './EditUser';
import Notifications from '../../../Core/Components/Notifications.';
import ConfirmDialog from '../../../Core/Components/ConfirmDialog';


const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader: {
        padding: useTheme().spacing(4),
        display: 'flex',
        marginBottom: useTheme().spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: useTheme().spacing(2),
        color: '#3c44b1'
    },
    pageTitle: {
        paddingLeft: useTheme().spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    },
    pageContent: {
        margin: useTheme().spacing(5),
        padding: useTheme().spacing(3)
    },
    newButton: {
        position: 'absolute',
        left: '11px'
    }
}))


const ViewUsers = () => {
    const classes = useStyles();
    const [t] = useTranslation('common')
    const isUserLogin = getCurrentUser().name;
    const navigate = useNavigate()
    const [users, setUsers] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false) // for Dilog
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(users)
    const [notification, setNotification] = useState({ isOpen: false, title: '', subTitle: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const addOrEdit = (values, id) => {

        console.log('Valuesssss Hellllo', values);
        // resetForm()
        setOpenPopup(false)
        const updateUserIndex = users.findIndex(e => e._id == id);
        console.log('updateUserIndex:', updateUserIndex)
        users[updateUserIndex] = { ...values }
        setRecordForEdit(null)
        // let newUsers = users;
        // console.log('users',users);
        setUsers(users)
        console.log('esh this new users ', users);
        setNotification({
            isOpen: true,
            message: 'okaaaaaaaaaaaa',
            type: 'success'
        })
        // navigate('/users')
        //     let data= [];

        //     console.log(data);

        //     data = [
        //         {id: 1, name: "A", age: "1"},
        //         {id: 2, name: "B", age: "2"},
        //         {id: 3, name: "C", age: "3"}
        //     ];

        //     console.log(data);

        //    const dataUpdate = {id: 1, name: "F"};

        //     const index = data.findIndex(x => x.id == 1);
        //     data[index] = { ...dataUpdate };

        //     console.log(data);

        //     console.log('update data:', values);
        //     console.log('with id:', id);


        // setNotify({
        //     isOpen: true,
        //     message: 'Submitted haha Successfully',
        //     type: 'success'
        // })
    }

    const openInPopup = row => {
        console.log('rrrrrrrrrr=>>>>>>>>>', row);
        setRecordForEdit(row)
        setOpenPopup(true)
    }

    const handleClose = () => {
        setOpenPopup(false);
        navigate('/users', { replace: true });
    };
    useEffect(async () => {
        setIsLoading(true)
        const response = await ApiGetRequest('users/getUsers')
        if (!response.isSuccessful) {
            setIsLoading(true)
            console.log('users is not found...');

        } else {
            setUsers(response?.data?.responseBody)
            console.log('users======', users);
            setIsLoading(false)
        }
    }, []);
    console.log('users list', users);
    const handleEdit = (id, email, name, phoneNumber, education, gender, address) => {
        navigate('/editUser', {
            state: {
                editFormInUser: true, id: id,
                email: email, name: name,
                phoneNumber: phoneNumber, education: education,
                gender: gender, address: address
            }
        })
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        ApiDeleteRequest(`users/${id}`)
            .then(response => {
                const updatedUser = users.filter(e => e._id != id);
                setUsers(updatedUser)
                setNotification({
                    isOpen: true,
                    message: 'delete',
                    type: 'error'
                })
            })

    }

    return (
        <>
            <PageHeader
                title={t("user_management")}
                subTitle={t("control_your_users")}
                icon={<AdminPanelSettingsIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>

                    <Button
                        color="primary"
                        variant="outlined"
                        style={{ textTransform: 'none' }}
                        startIcon={<AddBoxIcon />}
                        className={classes.newButton}
                        onClick={() => navigate('/newUser')}>
                        {t('add_new_user')}
                    </Button>


                </Toolbar>
                <Container maxWidth='lg' >



                    <CardContent>
                        {!isLoading ? (

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#1f7d4c4f', }}>
                                        <TableRow >
                                            <TableCell align="center">{t("name")}</TableCell>
                                            <TableCell align="center">{t("email")}</TableCell>
                                            <TableCell align="center">{t("role")} </TableCell>
                                            <TableCell align="center"> {t("action")}</TableCell>
                                            <TableCell align="center"> </TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {users && users != 0 ?
                                            users?.map((row) => (

                                                <TableRow key={row?._id}>
                                                    <TableCell align="center">{row?.name}  </TableCell>

                                                    <TableCell align="center" >{row?.email}</TableCell>
                                                    <TableCell align="center">
                                                        {row?.role}
                                                    </TableCell>
                                                    <TableCell sx={{ paddingLeft: '111px' }}>
                                                        <Button
                                                            color='primary'
                                                            onClick={() => openInPopup(row)}
                                                        >
                                                            test

                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            style={{ textTransform: 'none' }}
                                                            onClick={() => handleEdit(
                                                                row?._id,
                                                                row.email,
                                                                row.name,
                                                                row.phoneNumber,
                                                                row.education,
                                                                row.gender,
                                                                row.address,
                                                            )}
                                                            startIcon={<EditIcon />}
                                                        > </Button>
                                                        <Button
                                                            variant="text"
                                                            color="error"
                                                            startIcon={<DeleteIcon />}
                                                            style={{ textTransform: 'none' }}
                                                            onClick={() =>
                                                                setConfirmDialog({
                                                                    isOpen: true,
                                                                    title: 'sure to delte this user!',
                                                                    subTitle: 'delete user',//
                                                                    onConfirm: () => { handleDelete(row?._id)
}
                                                                })

                                                            }>

                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            :
                                            (
                                                <TableRow key="1">
                                                    <TableCell align="center" colSpan="5">{t("no_users")}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <CircularProgress
                                size="15rem"
                                style={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    color: '#E2E8EB'
                                }}
                            />
                        )}

                    </CardContent>

                </Container>

            </Paper>

            <Popup
                title='User Form'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}

            >
                <EditUser
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notifications
                notification={notification}
                setNotification={setNotification}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </>



    );
}

export default ViewUsers;