import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    div: {
        backgroundColor: "red",
        color: "white",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const FinishFailed = ({children, onClick}) => {
    const classes = useStyles();
    return (
        <div onClick={onClick} className={classes.div}>
            {children}
        </div>
    );
};

export default FinishFailed;
