import * as React from 'react';
import { useEffect, useState } from 'react';

import { Divider, CardContent, CircularProgress, Button, Card, Alert, Container, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from '../../../Core/Component/useLocalStorage';
import { ApiDeleteRequest, ApiGetRequest } from '../../../Core/API/ApiRequest';

const ViewUsers = () => {
    const [t] = useTranslation('common')
    const isUserLogin = getCurrentUser().name;
    const navigate = useNavigate()
    const [users, setUsers] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
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
        ApiDeleteRequest(`users/${id}`)
            .then(response => {
                const updatedUser = users.filter(e => e._id != id);
                setUsers(updatedUser)
            })
        navigate('/users')
    }
    const propStyle = { padding: '15px 15px' }
    return (
        <Container maxWidth='lg' style={propStyle}>
            <Typography variant="h6" gutterBottom component="div" align="left"> {t("hello")}  {isUserLogin} </Typography>
            <Typography variant="h6" gutterBottom component="div" align="left"> </Typography>


            <Card>
                <Typography variant="h2" gutterBottom component="div" align="center">{t("user_management")} </Typography>
                <Typography variant="h5" gutterBottom component="div" align="center">{t("control_your_users")} </Typography>

                <Divider />
                <Button variant="text" color="secondary" style={{ textTransform: 'none' }} onClick={() => navigate('/newUser')}>{t('add_new_user')}</Button>
                <Divider />
                <CardContent>
                    {!isLoading ? (

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">{t("name")}</TableCell>
                                        <TableCell align="center">{t("email")}</TableCell>
                                        <TableCell align="center">{t("role")} </TableCell>
                                        <TableCell align="center"> </TableCell>
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
                                                <TableCell>
                                                    <Button variant="text" color="secondary" style={{ textTransform: 'none' }}
                                                        onClick={() => handleEdit(
                                                            row?._id,
                                                            row.email,
                                                            row.name,
                                                            row.phoneNumber,
                                                            row.education,
                                                            row.gender,
                                                            row.address,
                                                        )}
                                                    > {t('edit')}</Button>
                                                    <Button variant="text" color="secondary" style={{ textTransform: 'none' }} onClick={() => handleDelete(row?._id)}>{t('delete')}</Button>
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
            </Card>
        </Container>


    );
}

export default ViewUsers;