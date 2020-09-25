import React, { Fragment } from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));


export default function Header() {
    const classes = useStyles();
    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Company
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}
