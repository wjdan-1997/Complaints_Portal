import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    dialog: {
        padding: useTheme().spacing(2),
        position: 'absolute',
        top: useTheme().spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
}))


export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()
    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>

                <IconButton disableRipple className={classes.titleIcon}>
                    <PersonRemoveIcon color='error' fontSize='large' />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant='h6' >
                    {confirmDialog.title}
                </Typography>
                <Typography variant='h6' >
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    onClick={confirmDialog.onConfirm}
                    color="primary"
                    variant="contained"
                    autoFocus
                    sx={{
                        backgroundColor: '#3c8084',
                        color: '#fff',
                        margin: '0 auto',
                        pr: 6,
                        pl: 6
                    }}
                >
                    Yes
                </Button>
                <Button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    color="primary"
                    variant="contained"
                    autoFocus
                    sx={{
                        backgroundColor: '#3c8084',
                        color: '#fff',
                        margin: '0 auto',
                        pr: 6,
                        pl: 6
                    }}
                >
                    No
                </Button>
            </DialogActions>

        </Dialog>
    )

}