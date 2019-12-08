import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { getRecorder, speechToMessage } from "coco-with-voice";

let recorder;

const RecordButton = ({
  userSpeak,
  invalid,
  disabled,
  sttUrl,
  onStartRecord,
  onEndRecord,
  children
}) => {
  const out = disabled || invalid;
  !recorder && getRecorder().then(r => (recorder = r));
  const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: "transparent",
      border: 0,
      borderBottomRightRadius: "10px",
      boxShadow: "none",
      cursor: `${disabled ? "default" : "pointer"}`,
      fill: `${invalid ? "#E53935" : "#4a4a4a"}`,
      opacity: `${disabled && !invalid ? ".5" : "1"}`,
      outline: "none",
      padding: "14px 16px 12px 16px",
      position: "absolute",
      right: 0,
      top: 0,
      "&::before": {
        content: `${userSpeak ? "' '" : ""}`,
        position: "absolute",
        width: "23px",
        height: "23px",
        borderRadius: "50%",
        animation: "$pulse 2s ease infinite"
      },
      "&:not(:disabled):hover": {
        opacity: "0.7"
      }
    },
    "@keyframes pulse": {
      "0%": { boxShadow: "0 0 0 0 rgba(1, 166, 224, 0.4)" },
      "70%": { boxShadow: "0 0 0 10px rgba(1, 166, 224, 0)" },
      "100%": { boxShadow: "0 0 0 0 rgba(1, 166, 224, 0)" }
    }
  }));
  const classes = useStyles();
  return (
    <button
      style={{ outline: 0 }}
      onPointerDown={() => {
        console.log("start", recorder, sttUrl);
        recorder.start();
        onStartRecord();
      }}
      onPointerUp={async () => {
        const blob = await recorder.stop();
        const reply = await speechToMessage(sttUrl, blob);
        const json = await reply.json();
        onEndRecord(json.error || json.result);
      }}
      className={classes.button}
      disabled={out}
    >
      {children}
    </button>
  );
};

export default withWidth()(RecordButton);
