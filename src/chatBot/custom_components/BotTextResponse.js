import React, { useEffect, useState, useRef } from "react";
import Loading from "../steps_components/common/Loading";
const axios = require("axios");

const BotTextResponse = ({
  previousStep,
  sessionId,
  triggerNextStep,
  setSuccess,
  setFailed,
  componentId,
  onResponse
}) => {
  const [res, setRes] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    if (res) {
      triggerNextStep({
        trigger: "json",
        value: { res, width: inputEl.current.offsetWidth }
      });
    }
  }, [res, triggerNextStep]);

  useEffect(() => {
    if (previousStep) {
      const voiceMessage = previousStep.value.voiceMessage;
      const text = voiceMessage ? voiceMessage : previousStep.message;
      axios
        .post(
          `https://app.coco.imperson.com/api/exchange/${componentId}/${sessionId}`,
          {
            user_input: text
            // context: { "user.firstName": name }
          }
        )
        .then(function(response) {
          if (response.data.component_failed) {
            setFailed(true);
          } else {
            if (response.data.component_done) {
              setSuccess(true);
            }
          }

          if (!response.data.response) {
            setRes({ ...response.data, response: "" });
          } else {
            setRes({ ...response.data });
            onResponse(response.data.response);
          }
        })
        .catch(function(error) {
          setRes({ response: "" });
          setFailed(true);
          console.log("error", error);
        });
    }
  }, [previousStep]);

  return <div ref={inputEl}>{res ? res.response : <Loading />}</div>;
};

export default BotTextResponse;
