import React, { useState, useEffect } from "react";
import Loading from "../../chatBot/steps_components/common/Loading";
const axios = require("axios");

const BotDemoResponse = ({
  previousStep,
  sessionId,
  triggerNextStep,
  setFailed
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
      const text = previousStep.message;
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
          }
        })
        .catch(function(error) {
          setRes("Failure!");
          setFailed(true);
          console.log("error", error);
        });
    }
  }, [previousStep]);

  return <div>{res ? res : <Loading />}</div>;
};

export default BotDemoResponse;
