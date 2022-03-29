import React from 'react';
import { useEffect, useState } from "react";
import { Divider, Box, styled, Grid, Paper, CardContent, CircularProgress, Button, Card, Alert, Container, FormHelperText, Typography, MenuItem, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { getCurrentUser } from '../../../../Core/Components/useLocalStorage';
import ChangePasswordApi from '../Api/ChangePassApi';
import { changePasswordValidation } from '../../../Users/Utils/UserValidation';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [t] = useTranslation('common');
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const { id } = getCurrentUser()
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ba9fc01f',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    const onSubmit = async (values) => {
        setErrMessage("")
        const response = await ChangePasswordApi(values, id)
        if (!response.isSuccessful) {
            console.log('err in change password');
            setErrMessage(`${response.errorMessage}`)
            // setIsLoading(true)
        } else {
            console.log('ooka pass changed');
            localStorage.clear()
            navigate('/signin')
        }
    }

    return (

        <Box
            sx={{
                py: 3
            }}
        >
            <Container maxWidth="md">
                <Card>
                    <Box sx={{ mb: 3, textAlign: 'center', paddingTop: '55px', margin: '0px' }}>
                        <Typography variant="h5" gutterBottom component="div" align="center">{t('change_password')} </Typography>
                    </Box>
                    <Divider />

                    <CardContent sx={{ padding: "30px", paddingTop: '25px' }}>
                        {errMessage && (
                            <Alert variant="outlined" severity="error">
                                {errMessage}
                            </Alert>
                        )}
                        {!isLoading ? (
                            <Form
                                onSubmit={onSubmit}
                                validate={(values) => { return changePasswordValidation(values) }}
                                render={({ handleSubmit, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, mr: 1.5 }}>

                                            <Grid item xs={6}>
                                                <Item>
                                                    <Field
                                                        label={t("current_password")}
                                                        name="password"
                                                        component={TextField}
                                                        type="password"
                                                        fullWidth
                                                    />
                                                </Item>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Item>
                                                    <Field
                                                        label={t("new_password")}
                                                        name="newPassword"
                                                        component={TextField}
                                                        type="password"
                                                        fullWidth
                                                    />
                                                </Item>

                                            </Grid>
                                        </Grid>
                                        <br /><br />
                                        <Grid item md={12} xs={12}>
                                            <Button
                                                disabled={submitting || pristine}
                                                variant="contained"
                                                color="secondary"
                                                type="submit"

                                                sx={{
                                                    borderRadius: '5em',
                                                    width: '100%',
                                                    margin: '0 auto',
                                                    backgroundColor: '#9c27b0'
                                                }}
                                            >
                                                {t("send")}
                                            </Button>

                                        </Grid>
                                        <br />
                                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                                    </form>
                                )}
                            />

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

export default ChangePassword;


