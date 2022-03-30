import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Divider, CardContent, CircularProgress, Button, Card, Alert, Container, Typography, Grid, Box } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';
import { ApiGetRequest } from '../../../Core/API/ApiRequest'
import { getCurrentUser, setComplaintInfo } from '../../../Core/Components/useLocalStorage';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../Core/Components/PageHeader';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PageCard from '../../../Core/Components/PageCard';
import TotalPending from '../../../Core/Components/PageCard';

const ViewComplaints = () => {
    const [t] = useTranslation('common')
    const isUserLogin = getCurrentUser().name;
    const navigate = useNavigate()
    const [complaints, setComplaints] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingStatus, setIsLoadingStatus] = useState(false)
    const [pending, setPending] = useState(0)
    const [resolved, setResolved] = useState(0)
    const [rejected, setRejected] = useState(0)


    useEffect(async () => {
        setIsLoading(true)
        const response = await ApiGetRequest('complaints')
        if (!response.isSuccessful) {
            setIsLoading(true)
            console.log('component is not initialing...');

        } else {
            setComplaints(response?.data?.responseBody)

            setPending(response?.data?.status?.pending)
            setResolved(response?.data?.status?.resolved)
            setRejected(response?.data?.status?.rejected)
            setIsLoadingStatus(true)
            setIsLoading(false)
        }
    }, []);

    console.log('pending', pending,);
    console.log('resolved', resolved,);

    const handleComplaint = async (id) => {
        const response = await ApiGetRequest(`complaints/${id}`)
        ApiGetRequest(`complaints/${id}`)
        setComplaintInfo(response.data.responseBody)
        setIsLoading(true)
        navigate('/complaint')
    }

    const propStyle = { padding: '15px 15px' }
    return (
        <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
            <PageCard loading={loadingStatus} totalpending={pending} totalrejected={rejected} toltalresolved={resolved} />

            <Container maxWidth='lg' style={propStyle}>

             
                <Typography variant="h6" gutterBottom component="div" align="left"> </Typography>


                <Card>
                    <Typography variant="h2" gutterBottom component="div" align="center">{t("all_complaints")} </Typography>

                    <Divider />
                    <CardContent>
                        {!isLoading ? (

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#1f7d4c4f', }}>
                                        <TableRow >
                                            <TableCell sx={{ fontWeight: '700' }} align="center">{t("subject")}</TableCell>
                                            <TableCell sx={{ fontWeight: '700' }} align="center">{t("complaint_type")}</TableCell>
                                            <TableCell sx={{ fontWeight: '700' }} align="center">{t("complaint_id")} </TableCell>
                                            <TableCell sx={{ fontWeight: '700' }} align="center">{t("severity")}</TableCell>
                                            <TableCell sx={{ fontWeight: '700' }} align="center">{t("status")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {complaints && complaints != 0 ?
                                            complaints?.map((row) => (

                                                <TableRow key={row?.complaintId}>
                                                    <TableCell align="center">
                                                        <Button variant="text" color="secondary" style={{ textTransform: 'none' }} onClick={() => handleComplaint(row?._id)}>{row?.subject}</Button>
                                                    </TableCell>
                                                    <TableCell align="center" >{row?.complainType}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="text" color="secondary" style={{ textTransform: 'none' }} onClick={() => handleComplaint(row?._id)}>{row?._id}</Button>
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
        </>



    );
}

export default ViewComplaints;