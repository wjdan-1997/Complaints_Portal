import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { makeStyles } from '@mui/styles';

import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    dialogWrapper: {
        padding: useTheme().spacing(2),
        position: 'absolute',
        top: useTheme().spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup, onClose, acceptBtnName } = props;
    const classes = useStyles()

    const handleAccept = () => {
        onClose();
    };
    return (
        <Dialog open={openPopup} maxWidth="md" classes={classes.dialogWrapper }>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    <Button
                        color='secondary'
                        onClick={() => { setOpenPopup(false) }}
                        startIcon={<CancelPresentationIcon />}
                    >

                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            {/* <DialogActions>
                <Button
                    onClick={handleAccept}
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
                    {acceptBtnName}
                </Button>
            </DialogActions> */}
        </Dialog>
    )
}