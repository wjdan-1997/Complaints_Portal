import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;
    return (
        <Dialog open={confirmDialog.isOpen} >
            <DialogTitle>


            </DialogTitle>
            <DialogContent>
                <Typography variant='h6'>
                    {confirmDialog.title}
                </Typography>
                <Typography variant='h2'>
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
           
        </Dialog>
    )

}