import React from 'react';

import { Typography, Card, Paper, Grid, Skeleton, CardContent, Avatar, Container, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import { useTranslation } from 'react-i18next';

const PageCard = (props) => {
    const [t] = useTranslation('common')

    const { loading = false, totalpending, totalrejected, toltalresolved } = props;
    return (

        <>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            sm={12}
                            xl={4}
                            xs={12}
                        >
                            <Card>
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Grid md={8} item>
                                            {loading ? (
                                                <Typography
                                                    color="textSecondary"
                                                    gutterBottom
                                                    variant="h5"
                                                >

                                                    {t('Pending_Request')}
                                                </Typography>
                                            ) : (
                                                <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
                                            )}
                                            {loading ? (
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h3"
                                                >
                                                    {totalpending}
                                                </Typography>
                                            ) : (
                                                <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
                                            )}
                                        </Grid>
                                        <Grid md={4} item>
                                            {loading ? (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: '#1f7d4c',
                                                        height: 56,
                                                        width: 56
                                                    }}
                                                >
                                                    <PendingActionsIcon />
                                                </Avatar>
                                            ) : (
                                                <Skeleton animation="wave" variant="circle" height={56} width={56} />
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={12}
                            xl={4}
                            xs={12}
                        >
                            <Card>
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Grid md={8} item>
                                            {loading ? (
                                                <Typography
                                                    color="textSecondary"
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    {t('Resolved_Request')}
                                                </Typography>
                                            ) : (
                                                <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
                                            )}
                                            {loading ? (
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h3"
                                                >
                                                    {toltalresolved}
                                                </Typography>
                                            ) : (
                                                <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
                                            )}
                                        </Grid>
                                        <Grid md={4} item>
                                            {loading ? (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: '#1f7d4c',
                                                        height: 56,
                                                        width: 56
                                                    }}
                                                >
                                                    <BookmarkAddedIcon />
                                                </Avatar>
                                            ) : (
                                                <Skeleton animation="wave" variant="circle" height={56} width={56} />
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={12}
                            xl={4}
                            xs={12}
                        >
                            <Card>
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Grid md={8} item>
                                            {loading ? (
                                                <Typography
                                                    color="textSecondary"
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    {t('Rejected_Request')}
                                                </Typography>
                                            ) : (
                                                <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
                                            )}
                                            {loading ? (
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h3"
                                                >
                                                    {totalrejected}
                                                </Typography>
                                            ) : (
                                                <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
                                            )}
                                        </Grid>
                                        <Grid md={4} item>
                                            {loading ? (
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: '#1f7d4c',
                                                        height: 56,
                                                        width: 56
                                                    }}
                                                >
                                                    <DoNotTouchIcon />
                                                </Avatar>
                                            ) : (
                                                <Skeleton animation="wave" variant="circle" height={56} width={56} />
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>



                    </Grid>
                </Container>
            </Box>

        </>

    );
};

export default PageCard;