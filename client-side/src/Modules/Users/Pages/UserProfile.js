import React from 'react';
import { useEffect, useState } from "react";
import { Divider, Box, styled, Grid, Paper, CardContent, CircularProgress, Button, Card, FormControl, Alert, Container, FormHelperText, Typography, MenuItem, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from 'react-i18next';
import { ApiGetRequest } from '../../../Core/API/ApiRequest';
const UserProfile = () => {
    const navigate = useNavigate();
    const [t] = useTranslation('common');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState()

    useEffect(async () => {
        setIsLoading(true)
        const response = await ApiGetRequest('users/currentUser')
        if (!response.isSuccessful) {
            setIsLoading(true)
            console.log('users is not found in user profile...');

        } else {
            setUsers(response.data.responseBody)
            setIsLoading(false)
        }
    }, []);
    const handleEdit = async () => {
        navigate('/editProfile', {
            state:
            {
                editForm: true,
                id: users?._id,
                name: users?.name,
                email: users?.email,
                phoneNumber: users?.phoneNumber,
                education: users?.education,
                address: users?.address,
                gender: users?.gender,

            }
        })
    }
    console.log('users list', users);
    console.log(users?.address);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ba9fc01f',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));
    return (
        <Box
            sx={{
                py: 3
            }}
        >
            <Container maxWidth="md">
                <Card>
                    <Box sx={{ mb: 3, textAlign: 'center', paddingTop: '55px', margin: '0px' }}>
                        <Typography variant="h5" gutterBottom component="div" align="center">{t('user_profile')} </Typography>
                    </Box>
                    
                    <CardContent>
                        {!isLoading ? (
                            <Box sx={{ width: '100%' }}>

                                <Divider />
                                <br /><br />
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography justify="center" component="h3">
                                                {t("name")}
                                            </Typography>
                                            <Item>{users?.name}</Item>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography justify="center" component="h3">
                                                {t("email")}
                                            </Typography>
                                            <Item>{users?.email}</Item>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography justify="center" component="h3">
                                                {t("phone_Number")}
                                            </Typography>
                                            <Item>{users?.phoneNumber}</Item>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography justify="center" component="h3">
                                                {t("education")}
                                            </Typography>
                                            <Item>{users?.education}</Item>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography justify="center" component="h3">
                                                {t("gender")}
                                            </Typography>
                                            <Item>{users?.gender}</Item>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography justify="center" component="h3">
                                                {t("address")}
                                            </Typography>
                                            <Item>{users?.address}</Item>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <Grid item md={12} xs={12}>
                                    <Button
                                        onClick={() => handleEdit(users?._id)}
                                        color='secondary'
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            borderRadius: '5em',
                                            width: '100%',
                                            margin: '0 auto',
                                            backgroundColor: '#9c27b0'
                                        }}
                                    >
                                        {t("edit")}
                                    </Button>

                                </Grid>
                            </Box>
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
        </Box>


    );
}

export default UserProfile;


