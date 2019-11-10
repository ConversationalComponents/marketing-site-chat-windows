import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    div: {
      animation: "$scale 0.3s ease forwards",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.15)",
      display: "inline-block",
      maxWidth: "70%",
      overflow: "hidden",
      position: "relative",
      paddingLeft: "7px",
      paddingRight: "7px",
      paddingTop: "4px",
      paddingBottom: "4px",
      fontSize: "12px",
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px"
      }
    },
    "@keyframes scale": {
      "0%": {
        transform: "scale(0)"
      },
      "100%": {
        transform: "scale(1)"
      }
    }
  };
});

const Bubble = ({ children, user, isFirst, isLast, windowWidth }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: `${user ? "#fff" : "#01A6E0"}`,
        transformOrigin: `${
          isFirst
            ? user
              ? "bottom right"
              : "bottom left"
            : user
            ? "top right"
            : "top left"
        }`,
        margin: `${
          !isFirst
            ? user
              ? "-8px 46px 10px 0"
              : "-8px 0 10px 46px"
            : "0 0 10px 0"
        }`,
        borderRadius: `${
          !isFirst && !isLast
            ? user
              ? "18px 0 18px 18px"
              : "0 18px 18px 18px"
            : !isFirst && isLast
            ? user
              ? "18px 0 18px 18px"
              : "0 18px 18px 18px"
            : user
            ? "18px 18px 0 18px"
            : "18px 18px 18px 0"
        }`,
        color: `${user ? "#4a4a4a" : "#fff"}`
      }}
      className={classes.div}
    >
      {children}
    </div>
  );
};

export default Bubble;
