import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import firebase from "../../config/fbConfig";
// import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import LinkedInTag from "react-linkedin-insight";

ReactPixel.init("411788576412453");
LinkedInTag.init(1592785);

const analytics = firebase.analytics();
// ReactGA.initialize("UA-143011310-1");

const Input = ({
  inputInvalid,
  inputPlaceholder,
  onKeyPress,
  onChange,
  disabled,
  value,
  renderedSteps,
  width,
  componentId,
  sessionId
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
  const label = JSON.stringify({
    component_id: componentId,
    session_id: sessionId
  });

  const labelWix = {
    component_id: componentId,
    session_id: sessionId
  };

  const [startTime, setStartTime] = useState(null);
  const [startFocus, setStartfocus] = useState(null);
  const [totalTime, setTotaltime] = useState(null);
  const [time, setTime] = useState(null);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

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
      setStartTime(performance.now());
    }
    const sendObj = {
      category: "chatwindow",
      action: "Input Click",
      labelWix
    };
    window.parent.postMessage(JSON.stringify(sendObj), "*");
    // window.ga("send", "event", "chatwindow", "Input Click", label);
    // ReactGA.event({
    //   category: "chatwindow",
    //   action: "Input Click",
    //   label
    // });
    // analytics.logEvent("input_click", {
    //   category: "chatwindow",
    //   action: "Input Click",
    //   label
    // });
    scrollView();
  };

  useEffect(() => {
    if (totalTime) {
      setTime(
        window.setTimeout(() => {
          const value = parseInt(totalTime) + 30;

          const sendObj = {
            category: "chatwindow",
            action: "Conversation Time",
            labelWix,
            value
          };

          window.parent.postMessage(JSON.stringify(sendObj), "*");

          // window.ga(
          //   "send",
          //   "event",
          //   "chatwindow",
          //   "Conversation Time",
          //   label,
          //   value
          // );
          // ReactGA.event({
          //   category: "chatwindow",
          //   action: "Conversation Time",
          //   label,
          //   value
          // });
          // analytics.logEvent("input_click", {
          //   category: "chatwindow",
          //   action: "Conversation Time",
          //   label,
          //   value
          // });
        }, 30000)
      );
    }
  }, [totalTime]);

  const keyPress = (e, disabled) => {
    if (e.key === "Enter") {
      if (first && second && !third) {
        setThird(true);
        LinkedInTag.track(1575849);
        ReactPixel.trackCustom("Conversation3Turns", {
          label
        });

        const sendObj = {
          category: "chatwindow",
          action: "Conversation3Turns",
          labelWix
        };

        window.parent.postMessage(JSON.stringify(sendObj), "*");

        // window.ga("send", "event", "chatwindow", "Conversation3Turns", label);
        // ReactGA.event({
        //   category: "chatwindow",
        //   action: "Conversation3Turns",
        //   label
        // });
        // analytics.logEvent("Conversation3Turns", {
        //   category: "chatwindow",
        //   action: "Conversation3Turns",
        //   label
        // });
      }

      if (first && !second) {
        setSecond(true);
      }

      if (!first) {
        setFirst(true);
        var callback = function() {
          if (typeof window.url != "undefined") {
            window.location = window.url;
          }
        };
        window.gtag("event", "conversion", {
          send_to: "AW-697286529/jLn-CNG2_rMBEIH_vswC",
          event_callback: callback
        });

        LinkedInTag.track(1575841);
        ReactPixel.trackCustom("StartConversation", {
          label
        });

        const sendObj = {
          category: "chatwindow",
          action: "StartConversation",
          labelWix
        };

        window.parent.postMessage(JSON.stringify(sendObj), "*");

        // window.ga("send", "event", "chatwindow", "StartConversation", label);
        // ReactGA.event({
        //   category: "chatwindow",
        //   action: "StartConversation",
        //   label
        // });
        // analytics.logEvent("input_click", {
        //   category: "chatwindow",
        //   action: "StartConversation",
        //   label
        // });
      }

      const sendObj = {
        category: "chatwindow",
        action: "Message Sent",
        labelWix
      };

      window.parent.postMessage(JSON.stringify(sendObj), "*");

      // window.ga("send", "event", "chatwindow", "Message Sent", label);
      // ReactGA.event({
      //   category: "chatwindow",
      //   action: "Message Sent",
      //   label
      // });
      // analytics.logEvent("input_click", {
      //   category: "chatwindow",
      //   action: "Message Sent",
      //   label
      // });
      if (startTime) {
        clearTimeout(time);
        const total = ((performance.now() - startTime) / 1000).toFixed(2);
        setTotaltime(total);
      }
    }
    onKeyPress(e, disabled);
  };

  const onFocus = () => {
    setStartfocus(performance.now());
    scrollView();
  };

  const onBlur = () => {
    const totalFocusTime = ((performance.now() - startFocus) / 1000).toFixed(2);
    // if (totalFocusTime > 10) {
    //   LinkedInTag.track(1575849);
    //   ReactPixel.trackCustom("Conversation10Sec", {
    //     label,
    //     value: totalFocusTime
    //   });
    //   ReactGA.event({
    //     category: "chatwindow",
    //     action: "Conversation10Sec",
    //     label,
    //     value: totalFocusTime
    //   });
    //   analytics.logEvent("Conversation10Sec", {
    //     category: "chatwindow",
    //     action: "Conversation10Sec",
    //     label,
    //     value: totalFocusTime
    //   });
    // }
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
