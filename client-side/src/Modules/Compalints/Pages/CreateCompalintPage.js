import React from 'react';
import { useState } from "react";
import { Divider, Box, Grid, Typography, CardContent, CircularProgress, Button, Card, Alert, Container, FormHelperText, MenuItem, FormControl, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import { TextField, Radio, Select } from 'final-form-material-ui';
import { useNavigate, useLocation } from "react-router";
import { Field, Form } from 'react-final-form';
import CheckBoxField from '../../../Core/Components/CheckBox';
import CreateCompalintApi from '../Api/CreateComplaintApi';
import { ApiPutRequest } from '../../../Core/API/ApiRequest';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';


const CreateCompalint = () => {
    const [t] = useTranslation('common')
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>', location?.state?.complainType);


    const onSubmit = async (values) => {
        setIsLoading(true)
        setErrMessage("")
        if (location?.state?.editForm) {
            setIsLoading(true)
            await ApiPutRequest(`complaints/${location.state.id}`,
                {
                    subject: values.subject,
                    description: values.description,
                    preferedLanguage: values.preferedLanguage,
                    complainType: values.complainType,
                    severity: values.severity,
                })
            setIsLoading(false)
            navigate('/')
        } else {
            const response = await CreateCompalintApi(values)
            if (!response.isSuccessful) {
                setErrMessage(`${response.errorMessage}`)
                setIsLoading(true)
            }
            navigate('/')
        }
    }
    const validate = values => {
        const msg = {}

        if (!values.complainType) {
            msg.complainType = 'This field required'
        }
        if (!values.description) {
            msg.description = 'This field required'
        }
        if (!values.severity) {
            msg.severity = 'This field required'
        }
        if (!values.subject) {
            msg.subject = 'This field required'
        }
        if (!values.preferedLanguage) {
            msg.preferedLanguage = 'This field required'
        }
        return msg
    }
    console.log(location?.state?.editForm);
    return (
        <>
          <Helmet>
          <title>Create CSomplaint</title>
        </Helmet>
         <Box
            sx={{
                //  backgroundColor: '#fafafa',
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
                        <Typography variant="h3" gutterBottom component="div" align="center">{t("create_complaint")} </Typography>
                    </Box>
                    <CardContent sx={{ padding: "30px", paddingTop: '0' }}>
                        {errMessage && (
                            <Alert variant="outlined" severity="error">
                                {errMessage}
                            </Alert>
                        )}
                        {!isLoading ? (
                            <>
                                <Form
                                    onSubmit={onSubmit}
                                    validate={validate}
                                    initialValues={
                                        !!location?.state?.editForm ? {
                                            subject: location?.state?.subject,
                                            description: location?.state?.description,
                                            preferedLanguage: location?.state?.preferedLanguage,
                                            complainType: location?.state?.complainType,
                                            severity: location?.state?.severity,
                                        } : ''}
                                    render={({ handleSubmit, submitting, pristine, values }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={3} mt={3}>
                                                <Grid item md={12} xs={12}>
                                                    <Field
                                                        fullWidth
                                                        name="complainType"
                                                        component={Select}
                                                        label={t("complaint_type")}
                                                        formControlProps={{ fullWidth: true }}
                                                    >
                                                        <MenuItem value="product">{t("product")}</MenuItem>
                                                        <br />
                                                        <MenuItem value="personal">{t("personal")}</MenuItem>
                                                        <br />

                                                        <MenuItem value="wait time">{t("wait_time")}</MenuItem>
                                                    </Field>
                                                </Grid>

                                                <Grid item md={12} xs={12} >
                                                    <Field
                                                        label={t("subject")}
                                                        name="subject"
                                                        component={TextField}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <Field
                                                        fullWidth
                                                        name="severity"
                                                        component={Select}
                                                        label={t("severity")}
                                                        formControlProps={{ fullWidth: true }}
                                                    >
                                                        <MenuItem value="low">{t("low")}</MenuItem>
                                                        <br />

                                                        <MenuItem value="high">{t("high")}</MenuItem>
                                                        <br />

                                                        <MenuItem value="medium">{t("medium")}</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <Field
                                                        label={t("description")}
                                                        name="description"
                                                        component={TextField}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item className="custom-label-field" >
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">{t("preferedLanguage")}</FormLabel>
                                                        <RadioGroup row>
                                                            <FormControlLabel
                                                                label={t("English")}
                                                                control={
                                                                    <Field
                                                                        name="preferedLanguage"
                                                                        component={Radio}
                                                                        type="radio"
                                                                        value="English"
                                                                    />
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                label={t("Arabic")}
                                                                control={
                                                                    <Field
                                                                        name="preferedLanguage"
                                                                        component={Radio}
                                                                        type="radio"
                                                                        value="Arabic"
                                                                    />
                                                                }
                                                            />

                                                        </RadioGroup>
                                                    </FormControl>

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
                                                        //color="secondary"
                                                        type="submit"
                                                        sx={{
                                                            borderRadius: '5em',
                                                            width: '100%',
                                                            margin: '0 auto',
                                                            //backgroundColor: '#b5099b'
                                                        }}
                                                    >
                                                        {t("create")}
                                                    </Button>
                                                </Grid>
                                            </Grid >
                                            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
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
                </Box>
            </Container>
        </Box>  
         </>
        
        

    );
}

export default CreateCompalint;


