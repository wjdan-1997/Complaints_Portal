import React from 'react';
import { useEffect, useState } from "react";
import { Divider, Box, styled, Grid, Paper, CardContent, CircularProgress, Button, Card, FormControl, Alert, Container, FormHelperText, Typography, MenuItem, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useNavigate, useLocation } from "react-router";
import { Field, Form } from 'react-final-form';
import { TextField, Select, Radio } from 'final-form-material-ui';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { useTranslation } from 'react-i18next';
import { ApiGetRequest } from '../../../Core/API/ApiRequest';
import { UserProfileApi } from '../Api/UserApi';
import { validate } from '../Utils/UserValidation';
import { Helmet } from 'react-helmet';

const UserProfile = () => {
    const navigate = useNavigate();
    const [t] = useTranslation('common');
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [users, setUsers] = useState();

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
    const onSubmit = async (values) => {
        const id = users?._id
        setErrMessage("")
        const response = await UserProfileApi(values, id)
        if (!response.isSuccessful) {
            setErrMessage(`${response.errorMessage}`)
            console.log('err in update profile by user');
        } else {
            console.log('okaaaaaaaay check !');
            localStorage.clear()
            navigate('/signin')
        }


    }
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
        //  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ba9fc01f',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
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
                        <Divider />

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
                                        validate={(values) => { return validate(values) }}
                                        initialValues={{
                                            name: users?.name,
                                            email: users?.email,
                                            phoneNumber: users?.phoneNumber,
                                            education: users?.education,
                                            address: users?.address,
                                            gender: users?.gender
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
                                                <br /><br />
                                                <Grid item md={12} xs={12}>
                                                    <Button
                                                        disabled={submitting || pristine}
                                                        variant="contained"
                                                        //color="secondary"
                                                        type="submit"

                                                        sx={{
                                                            borderRadius: '5em',
                                                            width: '100%',
                                                            margin: '0 auto',
                                                            //backgroundColor: '#9c27b0'
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
                    </Card>
                </Container>
            </Box>

        </>



    );
}

export default UserProfile;


