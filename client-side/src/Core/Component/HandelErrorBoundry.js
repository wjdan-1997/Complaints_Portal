/* eslint-disable */
import {
    Box,
    Container,
    Typography
} from '@material-ui/core';
import { useEffect } from 'react';

export default () => {

    useEffect(() => {

    }, [])
    return (
        <>
           
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        Something went wrong

                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        An error has occured
                    </Typography>
                   
                </Container>
            </Box>
        </>)

};

