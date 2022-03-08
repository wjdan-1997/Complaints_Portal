import React from 'react';
import {useState } from "react";
import { Divider, Grid,  styled, Box, Paper, CardContent, CircularProgress, Button, Card, Alert, Container, Typography } from '@mui/material';

import { useNavigate } from "react-router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ApiDeleteRequest, ApiPutRequest } from '../../../Core/API/ApiRequest';
import { getComplaintInfo, handleUserLogin } from '../../../Core/Component/useLocalStorage';
import { useTranslation } from 'react-i18next';

const Compalint = () => {
    const [t] =useTranslation('common')
    const navigate = useNavigate();
  
    const {
        subject,
        severity,
        status,
        openedBy,
        description,
        complainType,
        preferedLanguage,
        _id
    } = getComplaintInfo()
    const { isAdmin } = handleUserLogin();

    const [updateStatus, SetUpdateStatus] = useState('');

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));
    const handleChange = (event) => {
        SetUpdateStatus(event.target.value);
    };

    const handleSubmit = () => {
        ApiPutRequest(`complaints/updatestatus/${_id}`, { status: updateStatus })
            .then(response => {
                navigate('/')
            })
    }



    const handleDelete = (id) => {
        ApiDeleteRequest(`complaints/${id}`)
        navigate('/')
    }
    const handleEdit = () => {
        navigate('/complaint/edit', {
            state: {
                editForm: true,
                id: _id,
                subject: subject,
                severity: severity,
                description: description,
                complainType: complainType,
                preferedLanguage: preferedLanguage,

            }
        })
    }
    const buttonStyle = {
        float: "left",
        color: "white",
        marginLeft: '5px',
    }
    console.log("location?.state?.complainType", complainType);
    return (
        <Container maxWidth='sm'>
            <Card>
                <CardContent>
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Typography variant="h4" gutterBottom component="div" align="left">{t("all_complaints")}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    !isAdmin ? (
                                        <Grid>
                                            <Button variant="contained" style={buttonStyle} size="small" onClick={() => handleEdit()}>{t("edit")}</Button>
                                            <Button variant="contained" style={buttonStyle} color="error" size="small" onClick={() => handleDelete(_id)}>{t("delete")}</Button>
                                        </Grid>
                                    ) : (
                                        ''
                                    )
                                }
                            </Grid>
                        </Grid>

                        <Divider />
                        <br /><br />
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                        {t("subject")}
                                    </Typography>
                                    <Item>{subject}</Item>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                        {t("status")}
                                    </Typography>
                                    <Item>{status}</Item>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                        {t("complaint_id")}
                                    </Typography>
                                    <Item>{_id}</Item>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                        {t("severity")}
                                    </Typography>
                                    <Item>{severity}</Item>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                       {t("complaint_type")}
                                    </Typography>
                                    <Item>{complainType}</Item>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                        {t("opened_by")}
                                    </Typography>
                                    <Item>{openedBy}</Item>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid>
                                    <Typography justify="center" component="h3">
                                        {t("details")}
                                    </Typography>
                                    <Item>{description}</Item>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                </CardContent>
                <Divider />
                <CardContent>
                    <br /><br />
                    {isAdmin ? (
                        <Box sx={{ flexGrow: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                                <Select
                                    // defaultValue={status}
                                    value={updateStatus}
                                    label="status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value='dismissed'>{t("dismissed")}</MenuItem>
                                    <MenuItem value='resolution'>{t("resolution")}</MenuItem>
                                    <MenuItem value='resolved'>{t("resolved")}</MenuItem>
                                </Select>
                            </FormControl>
                            <br /><br />

                            <Grid item xs={8}>
                                <Button variant="contained" color="secondary"
                                    sx={{
                                        borderRadius: '5em',
                                        width: '100%',
                                        margin: '0 auto',
                                        backgroundColor: '#9c27b0',
                                    }}
                                    onClick={() => handleSubmit()}>
                                    {t("update")}
                                </Button>
                            </Grid>
                        </Box>)
                        :
                        ('')
                    }

                </CardContent>
            </Card>

        </Container>

    );
}

export default Compalint;


