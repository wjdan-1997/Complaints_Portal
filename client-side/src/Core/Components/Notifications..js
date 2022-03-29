import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    root: {
        top: useTheme().spacing(9)
    }
}))

export default function Notifications(props) {
    const { notification, setNotification } = props;
    const classes = useStyles();

    const handleClose = () => {
        setNotification({
            ...notification,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            // sx={{ padding: '120px' }}
            open={notification.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        //onClose={handleClose}
        >
            <Alert
                severity={notification.type}
            //onClose={handleClose}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    )


}