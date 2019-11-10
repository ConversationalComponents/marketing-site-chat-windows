import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    div: {
        backgroundColor: "#00c853",
        color: "white",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const FinishSuccess = ({children, onClick}) => {
    const classes = useStyles();
    return (
        <div onClick={onClick} className={classes.div}>
            {children}
        </div>
    );
};

export default FinishSuccess;
