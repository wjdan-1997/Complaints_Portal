import React from 'react'
import { useEffect, useState } from "react";
import { Divider, Grid, Typography, Alert, Link, CardContent, CircularProgress, Button, Card, Container } from '@mui/material';
import { Field, Form } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { useTranslation } from "react-i18next";
import UserLoginApi from "../Api/UserLoginApi";
import { useNavigate } from "react-router-dom";
import { setUserLogin,setAuthToken } from '../../../../Core/Component/useLocalStorage';
import axios from 'axios';

const Login = () => {
    const [t] = useTranslation('common')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        setIsLoading(false)
        console.log('login second');
    }, []);
    const onSubmit = async (values) => {
        setErrMessage("")
        const response = await UserLoginApi(values)
        if (!response.isSuccessful) {
            setErrMessage(`${response.errorMessage}`)
        } else {
            const token = response?.data?.token;
            localStorage.setItem("token", token)
            //setAuthToken(token)
            setUserLogin(token)
            console.log('now set the user');
            navigate('/')
        }
    }
    const validate = values => {
        const msg = {}

        if (!values.email) {
            msg.email = 'This field required'
        }
        if (!values.password) {
            msg.password = 'This field required'
        }

        return msg
    }
    const propStyle = { padding: '15px 15px', width: 500, margin: 'auto' }
    return (
        <Container maxWidth='sm' style={propStyle}>
            <Card>
                <Typography variant="h6" gutterBottom component="div" align="center">{t('login')}</Typography>
                <Divider />
                {errMessage && (
                    <Alert variant="outlined" severity="error">
                        {errMessage}
                    </Alert>
                )}
                <CardContent>
                    {!isLoading ? (
                        <>
                            <Form
                                onSubmit={onSubmit}
                                validate={validate}
                                render={({ handleSubmit, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3} mt={3}>
                                            <Grid item md={12} xs={12} >
                                                <Field
                                                    label={t("email")}
                                                    name="email"
                                                    component={TextField}
                                                    type="text"
                                                    fullWidth
                                                />

                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Field
                                                    label={t("password")}
                                                    name="password"
                                                    component={TextField}
                                                    type="password"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <br />
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
                                                {t("login")}
                                            </Button>

                                        </Grid>
                                        <br />
                                        <Grid item md={12} xs={12}>
                                            <Typography> {t('not_registered')}
                                                <Link color='secondary' underline='none' href="signup"> {t("create_Customer_Account")}</Link>
                                                <br />
                                                <Link color='secondary' underline='none' href="signupAdmin">{t("create_Admin_Account")}</Link>
                                            </Typography>
                                        </Grid>
                                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                                    </form>
                                )}
                            />

                        </>
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

export default Login;


