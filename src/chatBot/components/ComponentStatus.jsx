import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    p: {
        fontSize: "12px",
        paddingTop: "7px",
        margin: 0
    }
}));

const ComponentStatus = ({children}) => {
    const classes = useStyles();
    return <p className={classes.p}>{children}</p>;
};

export default ComponentStatus;
