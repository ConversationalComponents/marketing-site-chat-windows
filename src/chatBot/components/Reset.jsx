import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  p: {
    fontSize: "15px",
    paddingBottom: "7px",
    margin: 0
  }
}));

const Reset = ({ children }) => {
  const classes = useStyles();
  return <p className={classes.p}>{children}</p>;
};

export default Reset;
