import React from 'react';
import { useEffect, useState } from "react";
import { Divider, Box, Grid, CardHeader, styled, Paper, CardContent, CircularProgress, Button, Card, FormControl, Alert, Container, FormHelperText, Typography, MenuItem, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { TextField, Select, Radio } from 'final-form-material-ui';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { useNavigate, useLocation } from "react-router";
import { Field, Form } from 'react-final-form';


import { useTranslation } from 'react-i18next';
import { UserProfileByAdminApi } from '../Api/UserApi';

import { CustomerRegisterionValidation } from '../../UserAuthentication/Registerions/Utils/RegisterionsValidation';
const EditUser = (props) => {
    const { recordForEdit, addOrEdit } = props
    console.log('iddddddd=>>>>>>', recordForEdit?._id);

    const location = useLocation();
    const navigate = useNavigate();
    const [t] = useTranslation('common');
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    // useEffect => currentUser(id) => all info 

    const [openPopup, setOpenPopup] = useState(false) // for Dilog


    const onSubmit = async (values) => {
        const id = recordForEdit?._id;
        const response = await UserProfileByAdminApi(values, id)
        if (!response.isSuccessful) {
            setErrMessage(`${response.errorMessage}`)
            console.log('err  in update profile by admin');
        }
        else {
            setIsLoading(false)
            addOrEdit(values, id)
            // navigate('/')
        }


    }
    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ba9fc01f',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    console.log('location=====', location.state);
    return (
        <Box
            sx={{
                py: 3
            }}
        >
            <Container maxWidth="md">

                {/* <Box sx={{ mb: 3, textAlign: 'center', paddingTop: '55px', margin: '0px' }}>
                        <Typography variant="h5" gutterBottom component="div" align="center">{t('user_profile')} </Typography>
                    </Box>
                    <Divider /> */}

                <CardContent sx={{ padding: "30px", paddingTop: '22px' }}>
                    {errMessage && (
                        <Alert variant="outlined" severity="error">
                            {errMessage}
                        </Alert>
                    )}
                    {!isLoading ? (
                        <>
                            <Form
                                onSubmit={onSubmit}
                                validate={(values) => { return CustomerRegisterionValidation(values) }}
                                initialValues={
                                    !!location?.state?.editFormInUser ? {
                                        name: location?.state?.name,
                                        email: location?.state?.email,
                                        address: location?.state?.address,
                                        phoneNumber: location?.state?.phoneNumber,
                                        gender: location?.state?.gender,
                                        education: location?.state?.education,


                                    } : {
                                        name: recordForEdit?.name,
                                        email: recordForEdit?.email,
                                        phoneNumber: recordForEdit?.phoneNumber,
                                        education: recordForEdit?.education,
                                        address: recordForEdit?.address,
                                        gender: recordForEdit?.gender,
                                    }}
                                render={({ handleSubmit, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item xs={6}>
                                                <Item>
                                                    <Field
                                                        label={t("name")}
                                                        name="name"
                                                        component={TextField}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Item>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Item>
                                                    <Field
                                                        label={t("email")}
                                                        name="email"
                                                        component={TextField}
                                                        type="email"
                                                        fullWidth
                                                    />
                                                </Item>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Item>
                                                    <Field
                                                        label={t("password")}
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
                                                        label={t("phone_Number")}
                                                        name="phoneNumber"
                                                        component={TextFieldFinal}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Item>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Item>
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
                                                </Item>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Item>
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
                                                </Item>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Item>
                                                    <Field
                                                        label={t("address")}
                                                        name="address"
                                                        component={TextField}
                                                        multiline
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Item>

                                            </Grid>

                                        </Grid>
                                        <br />
                                        <Divider />
                                        <br />
                                        <Grid item md={12} xs={12}>
                                            <Button
                                                disabled={submitting || pristine}
                                                variant="outlined"
                                                color="secondary"
                                                type="submit"
                                                sx={{
                                                    borderRadius: '5em',
                                                    width: '100%',
                                                    margin: '0 auto',
                                                    // backgroundColor: '#9c27b0'
                                                }}
                                            >
                                                {t("send")}
                                            </Button>

                                        </Grid>

                                    </form>
                                )}
                            />

                        </>
                    )
                        :
                        (
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
        </Box>

    );
}

export default EditUser;


