import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import firebase from "../../config/fbConfig";
import ReactGA from "react-ga";

const analytics = firebase.analytics();
ReactGA.initialize("UA-143011310-3");

const Input = ({
  inputInvalid,
  inputPlaceholder,
  onKeyPress,
  onChange,
  disabled,
  value,
  renderedSteps,
  width,
  componentId
}) => {
  const inputRef = useRef(null);
  const useStyles = makeStyles(theme => {
    return {
      input: {
        border: 0,
        borderRadius: 0,
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        borderTop: "1px solid #eee",
        boxShadow: "none",
        boxSizing: "border-box",
        fontSize: "16px",
        opacity: `${disabled && !inputInvalid ? ".5" : "1"}`,
        outline: "none",
        padding: "16px 10px",
        width: "100%",
        "-webkit-appearance": "none",
        "&:disabled": {
          background: "#fff"
        }
      }
    };
  });

  useEffect(() => {
    if (renderedSteps.length > 2) {
      inputRef.current.focus();
    } else {
      // inputRef.current.blur();
    }
  }, [disabled, renderedSteps.length]);

  const scrollView = () => {
    if (width === "xs") {
      setTimeout(function() {
        document.activeElement.scrollIntoView(false);
      }, 500);
    }
  };

  const onClick = () => {
    console.log("click", componentId);
    ReactGA.event({
      category: "Chat Window",
      action: "Input Click",
      label: componentId
    });
    analytics.logEvent("input_click", {
      category: "Chat Window",
      action: "Input Click",
      label: componentId
    });
    scrollView();
  };

  const classes = useStyles();
  return (
    <input
      onClick={onClick}
      onFocus={scrollView}
      className={classes.input}
      ref={inputRef}
      value={value}
      onChange={onChange}
      onKeyPress={e => onKeyPress(e, disabled)}
      type="textarea"
      // disabled={disabled}
      placeholder={inputInvalid ? "" : inputPlaceholder}
    />
  );
};

export default withWidth()(Input);
