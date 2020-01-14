import React, { useState, useEffect } from "react";
import Loading from "../../chatBot/steps_components/common/Loading";
const axios = require("axios");

const BotDemoResponse = ({
  previousStep,
  sessionId,
  triggerNextStep,
  setFailed,
  onResponse
}) => {
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (res) {
      triggerNextStep({
        trigger: "get_user_input"
      });
    }
  }, [res, triggerNextStep]);

  useEffect(() => {
    if (previousStep) {
      const voiceMessage = previousStep.value.voiceMessage;
      var text = voiceMessage ? voiceMessage : previousStep.message;
      // const text = previousStep.message;
      
      text = text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')

      axios
        .post(
          `https://gwapi.imperson.com/appget.aspx?key=GDZTDKK9EGTPP7ZMDQYR`,
          {
            inputText: text,
            user: { id: sessionId }
          }
        )
        .then(function(response) {
          if (!response.data.text) {
            setRes("");
          } else {
            setRes(response.data.text);
            onResponse(response.data.text);
          }
        })
        .catch(function(error) {
          setRes("");
          setFailed(true);
          console.log("error", error);
        });
    }
  }, [previousStep]);

  return <div>{res ? res : <Loading />}</div>;
};

export default BotDemoResponse;
