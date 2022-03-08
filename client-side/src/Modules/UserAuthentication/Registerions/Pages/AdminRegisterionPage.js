import React from 'react'
import { useEffect, useState } from "react";
import { Divider, Grid, Typography, CardContent, CircularProgress, Button, Card, Alert, Container } from '@mui/material';
import { Field, Form } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { AdminRegisterionValidation } from "../Utils/RegisterionsValidation";
import CheckBoxField from '../../../../Core/Component/CheckBox'
import { AdminRegisterionApi } from '../Api/UserRegistrionApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const AdminRegisterion = () => {
    const [t] = useTranslation('common')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        setIsLoading(false)
        console.log();
    }, []);

    const onSubmit = async (values) => {
        setErrMessage("")
        const response = await AdminRegisterionApi(values)
        if (!response.isSuccessful) {
            setErrMessage(`${response.errorMessage}`)
        } else {
            navigate('/signin')
        }
    }


    const propStyle = { padding: '15px 15px', width: 500, margin: 'auto' }
    return (

        <Container maxWidth='sm' style={propStyle}>
            <Card>
                <Typography variant="h5" gutterBottom component="div" align="center">{t("admin_Registration_Form")}</Typography>

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
                                validate={(values) => {
                                    return AdminRegisterionValidation(values)
                                }}
                                render={({ handleSubmit, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3} mt={3}>

                                            <Grid item md={12} xs={12} >
                                                <Field
                                                    label={t("name")}
                                                    name="name"
                                                    component={TextField}
                                                    type="text"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Field

                                                    label={t("email")}
                                                    name="email"
                                                    component={TextField}
                                                    type="email"
                                                    fullWidth
                                                />

                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Field
                                                    label={t("password")}
                                                    name="password"
                                                    component={TextField}
                                                    type="password"
                                                    type="text"
                                                    fullWidth

                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={4} mt={3}>
                                            <Grid item md={12} xs={12} >
                                                <CheckBoxField
                                                    label={t("terms")}
                                                    name='Agree'
                                                    required='true'
                                                />
                                            </Grid>
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
                                                    {t("register_btn")}
                                                </Button>
                                            </Grid>
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

export default AdminRegisterion;


