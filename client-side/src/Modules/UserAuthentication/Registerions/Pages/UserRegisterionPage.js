import React from 'react';
import { useEffect, useState } from "react";
import { Divider, Box, Grid, CardHeader, CardContent, CircularProgress, Button, Card, FormControl, Alert, Container, FormHelperText, Typography, MenuItem, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { TextField, Select, Radio } from 'final-form-material-ui';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { useNavigate, useLocation } from "react-router";
import { Field, Form } from 'react-final-form';


import { CustomerRegisterionApi } from "../Api/UserRegistrionApi";
import { CustomerRegisterionValidation } from "../Utils/RegisterionsValidation";
import CheckBoxField from '../../../../Core/Components/CheckBox'
import { useTranslation } from 'react-i18next';
import { ApiPutRequest } from '../../../../Core/API/ApiRequest';
const CustomerRegisterion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [t] = useTranslation('common');
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const onSubmit = async (values) => {

        setErrMessage("")
        const response = await CustomerRegisterionApi(values)
        if (!response.isSuccessful) {
            console.log("errrrrrr", response.errorMessage, 'msg', errMessage);
            setErrMessage(`${response.errorMessage}`)
        } else {
            console.log('itsss woorrrkkk!!!!!!');
            navigate('/signin')
        }
    }
    return (
        <Box
            sx={{
                backgroundColor: '#fafafa',
                width: '100%',
                height: "100%",
                backgroundSize: "cover"
            }}
        >
            <Container
                maxWidth="sm"
                sx={{

                    paddingRight: 3,
                    paddingLeft: 3,

                }}
            >
                <Box sx={{
                    mt: '2%',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    paddingRight: 3,
                    paddingLeft: 3,
                    boxShadow: '5px 10px 18px #ecf1f5'
                }}>
                    <Box sx={{ mb: 3, textAlign: 'center', paddingTop: '55px', margin: '0px' }}>
                        <Typography variant="h5" gutterBottom component="div" align="center">
                            {t('Registration')}
                        </Typography>

                        <Typography variant="p" gutterBottom component="div" align="center">
                            Join to Inspire Complaints Management Portal
                        </Typography>
                    </Box>
                    <CardContent sx={{ padding: "30px", paddingTop: '0' }}>
                        {errMessage && (
                            <Alert variant="outlined" severity="error">
                                {errMessage}
                            </Alert>
                        )}
                        {!isLoading ? (
                            <Form
                                onSubmit={onSubmit}
                                validate={(values) => {
                                    return CustomerRegisterionValidation(values)
                                }}

                                render={({ handleSubmit, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} mt={3}>
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
                                                    fullWidth

                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Field
                                                    label={t("phone_Number")}
                                                    name="phoneNumber"
                                                    component={TextFieldFinal}
                                                    type="text"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    label={t("education")}
                                                    name="education"
                                                    component={Select}
                                                    formControlProps={{ fullWidth: true }}
                                                >
                                                    <MenuItem value="Bachelors">{t("Bachelors")}</MenuItem>
                                                    <br />
                                                    <MenuItem value="Master">{t("Master")}</MenuItem>
                                                    <br />

                                                    <MenuItem value="PhD">{t("PhD")}</MenuItem>
                                                </Field>
                                            </Grid>
                                            <Grid item className="custom-label-field" >
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{t("gender")}</FormLabel>
                                                    <RadioGroup row>
                                                        <FormControlLabel
                                                            label={t("female")}
                                                            control={
                                                                <Field
                                                                    name="gender"
                                                                    component={Radio}
                                                                    type="radio"
                                                                    value="female"
                                                                />
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            label={t("male")}
                                                            control={
                                                                <Field
                                                                    name="gender"
                                                                    component={Radio}
                                                                    type="radio"
                                                                    value="male"
                                                                />
                                                            }
                                                        />

                                                    </RadioGroup>

                                                </FormControl>
                                            </Grid>

                                            <Grid item md={12} xs={12}>
                                                <Field
                                                    label={t("address")}
                                                    name="address"
                                                    component={TextField}
                                                    multiline
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
                                                {!!location?.state?.editForm ? <Button
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
                                                    {t('update_btn')}
                                                </Button> :
                                                 <Button
                                                    disabled={submitting || pristine}
                                                    variant="contained"
                                                   // color="secondary"
                                                    type="submit"
                                                    sx={{
                                                        borderRadius: '5em',
                                                        width: '100%',
                                                        margin: '0 auto',
                                                       // backgroundColor: '#9c27b0'
                                                    }}
                                                >
                                                    {t('register_btn')}
                                                </Button>}
                                            </Grid>
                                        </Grid >
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
                </Box>
            </Container>
        </Box>


    );
}

export default CustomerRegisterion;


