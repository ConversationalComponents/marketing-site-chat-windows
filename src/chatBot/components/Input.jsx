import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import firebase from "../../config/fbConfig";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import LinkedInTag from "react-linkedin-insight";

ReactPixel.init("411788576412453");
LinkedInTag.init(1592785);

const analytics = firebase.analytics();
ReactGA.initialize("UA-143011310-1");

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

  const [startTime, setStartTime] = useState(null);
  const [startFocus, setStartfocus] = useState(null);
  const [totalTime, setTotaltime] = useState(null);
  const [time, setTime] = useState(null);
  const [first, setFirst] = useState(false);

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
    if (!startTime) {
      console.log("new start", componentId);
      setStartTime(performance.now());
    }
    ReactPixel.trackCustom("Input Click", {
      action: "Input Click",
      label: componentId
    });
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

  useEffect(() => {
    if (totalTime) {
      console.log("total", totalTime);

      setTime(
        window.setTimeout(() => {
          const value = parseInt(totalTime) + 30;
          console.log("done!", value);
          ReactPixel.trackCustom("Conversation Time", {
            label: componentId,
            value
          });
          ReactGA.event({
            category: "Chat Window",
            action: "Conversation Time",
            label: `${componentId}: ${value} sec`,
            value
          });
          analytics.logEvent("input_click", {
            category: "Chat Window",
            action: "Conversation Time",
            label: `${componentId}: ${value} sec`,
            value
          });
        }, 30000)
      );
    }
  }, [totalTime]);

  const keyPress = (e, disabled) => {
    if (e.key === "Enter") {
      if (!first) {
        console.log("first");
        setFirst(true);
        LinkedInTag.track(1575841);
        ReactPixel.trackCustom("Start Conversation", {
          label: componentId
        });
        ReactGA.event({
          category: "Chat Window",
          action: "Start Conversation",
          label: componentId
        });
        analytics.logEvent("input_click", {
          category: "Chat Window",
          action: "Start Conversation",
          label: componentId
        });
      }

      ReactPixel.trackCustom("Message Sent", {
        label: componentId
      });
      ReactGA.event({
        category: "Chat Window",
        action: "Message Sent",
        label: componentId
      });
      analytics.logEvent("input_click", {
        category: "Chat Window",
        action: "Message Sent",
        label: componentId
      });
      if (startTime) {
        clearTimeout(time);
        const total = ((performance.now() - startTime) / 1000).toFixed(2);
        setTotaltime(total);
      }
    }
    onKeyPress(e, disabled);
  };

  const onFocus = () => {
    console.log("focus", componentId);
    setStartfocus(performance.now());
    scrollView();
  };

  const onBlur = () => {
    console.log("blur", componentId);
    const totalFocusTime = ((performance.now() - startFocus) / 1000).toFixed(2);
    console.log("total focus", totalFocusTime);
    if (totalFocusTime > 10) {
      LinkedInTag.track(1575849);
      ReactPixel.trackCustom("Conversation10Sec", {
        label: componentId,
        value: totalFocusTime
      });
      ReactGA.event({
        category: "Chat Window",
        action: "Conversation10Sec",
        label: `${componentId}: ${totalFocusTime} sec`,
        value: totalFocusTime
      });
      analytics.logEvent("Conversation10Sec", {
        category: "Chat Window",
        action: "Conversation10Sec",
        label: `${componentId}: ${totalFocusTime} sec`,
        value: totalFocusTime
      });
    }
  };

  const classes = useStyles();
  return (
    <input
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      className={classes.input}
      ref={inputRef}
      value={value}
      onChange={onChange}
      onKeyPress={e => keyPress(e, disabled)}
      type="textarea"
      // disabled={disabled}
      placeholder={inputInvalid ? "" : inputPlaceholder}
    />
  );
};

export default withWidth()(Input);
