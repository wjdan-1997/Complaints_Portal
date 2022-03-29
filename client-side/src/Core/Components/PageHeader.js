import React from 'react';

import { Typography, Card, Paper, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';


const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#fdfdff',
        // width:'400px',
        // borderRadius:'22px ',
        // border:'1px '
    },
    pageHeader: {
        padding: useTheme().spacing(4),
        display: 'flex',
        marginBottom: useTheme().spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: useTheme().spacing(2),
        color: '#3c44b1'
    },
    pageTitle: {
        paddingLeft: useTheme().spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    },
    pageContent: {
        margin: useTheme().spacing(5),
        padding: useTheme().spacing(3)
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

export default function PageHeader(props) {
    const classes = useStyles();

    const { title, subTitle, icon, totalPendingRequests, totalResolveRequests, totalresolutionRequests } = props;

    return (
        <Card elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    
                    <Typography
                        variant="h6"
                        component="div">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Card>
    )
}