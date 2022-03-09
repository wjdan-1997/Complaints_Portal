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
import { ApiGetRequest } from '../../../Core/API/ApiRequest'
import { handleUserLogin, setComplaintInfo } from '../../../Core/Component/useLocalStorage';
import { useTranslation } from 'react-i18next';

const ViewComplaints = () => {
    const [t] = useTranslation('common')
    const isUserLogin = handleUserLogin().name;
    const navigate = useNavigate()
    const [complaints, setComplaints] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        setIsLoading(true)
        const response = await ApiGetRequest('complaints')
        if (!response.isSuccessful) {
            setIsLoading(true)
            console.log('component is not initialing...');

        } else {
            setComplaints(response?.data?.responseBody)
            setIsLoading(false)
        }
    }, []);

    const handleComplaint = async (id) => {
        const response = await ApiGetRequest(`complaints/${id}`)
        ApiGetRequest(`complaints/${id}`)
        setComplaintInfo(response.data.responseBody)

        navigate('/complaint')
    }

    const propStyle = { padding: '15px 15px' }
    return (
        <Container maxWidth='lg' style={propStyle}>
            <Typography variant="h6" gutterBottom component="div" align="left"> Hello  {isUserLogin} </Typography>
            <Typography variant="h6" gutterBottom component="div" align="left"> </Typography>


            <Card>
                <Typography variant="h2" gutterBottom component="div" align="center">{t("all_complaints")} </Typography>

                <Divider />
                <CardContent>
                    {!isLoading ? (

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">{t("subject")}</TableCell>
                                        <TableCell align="center">{t("complaint_type")}</TableCell>
                                        <TableCell align="center">{t("complaint_id")} </TableCell>
                                        <TableCell align="center">{t("severity")}</TableCell>
                                        <TableCell align="center">{t("status")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {complaints && complaints != 0?
                                        complaints?.map((row) => (

                                            <TableRow key={row?.complaintId}>
                                                <TableCell align="center">
                                                    <Button variant="text" color="secondary" onClick={() => handleComplaint(row?._id)}>{row?.subject}</Button>
                                                </TableCell>
                                                <TableCell align="center" >{row?.complainType}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="text" color="secondary" onClick={() => handleComplaint(row?._id)}>{row?._id}</Button>
                                                </TableCell>
                                                <TableCell align="center">{row?.severity}</TableCell>
                                                <TableCell align="center">{row?.status}</TableCell>
                                                <TableCell>

                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :
                                        (
                                            <TableRow key="1">
                                                <TableCell align="center" colSpan="5">{t("warning")}</TableCell>
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

export default ViewComplaints;