import React, { useState, useRef, useEffect } from "react";
import Loading from "../../chatBot/steps_components/common/Loading";

const axios = require("axios");

const CompetitionBotResponse = ({
  previousStep,
  sessionId,
  triggerNextStep,
  setFailed,
  componentId,
  onResponse
}) => {
  const [res, setRes] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    if (res) {
      if (!res.component_done && !res.component_failed) {
        triggerNextStep({
          trigger: "get_user_input"
        });
      }
    }
  }, [res, triggerNextStep]);

  const getresponse = () => {
    if (
      res.response.includes(
        "https://www.conversationalcomponents.com/competition"
      )
    ) {
      const newRes = res.response.split(
        "https://www.conversationalcomponents.com/competition"
      );
      return (
        <React.Fragment>
          <p className="m-0 p-0">{newRes[0]}</p>
          <a
            href="https://www.conversationalcomponents.com/competition-registration"
            target="_blank"
            className="m-0 p-0"
            style={{ color: "#9c27b0" }}
          >
            Click Here!
          </a>
          <p className="m-0 p-0">{newRes[1]}</p>
        </React.Fragment>
      );
    } else {
      return res.response;
    }
  };

  useEffect(() => {
    if (previousStep) {
      const voiceMessage = previousStep.value.voiceMessage;
      const text = voiceMessage ? voiceMessage : previousStep.message;
      console.log("text", text);
      axios
        .post(
          `https://app.coco.imperson.com/api/exchange/${componentId}/${sessionId}`,
          {
            user_input: text
          }
        )
        .then(function(response) {
          if (
            response.data &&
            response.data.response.includes(
              "have you heard about CoCo's Chatbot Competition in Berlin this December" // first message
            )
          ) {
            axios
              .post(
                `https://app.coco.imperson.com/api/exchange/${componentId}/${sessionId}`,
                {
                  user_input: text
                }
              )
              .then(function(response) {
                setRes({ ...response.data });
                onResponse(response.data.response);
              })
              .catch(function(error) {
                setRes({ response: "" });
                setFailed(true);
                console.log("error", error);
              });
          } else {
            if (!response.data.response) {
              setRes({ ...response.data, response: "" });
            } else {
              setRes({ ...response.data });
              onResponse(response.data.response);
            }
          }
        })
        .catch(function(error) {
          setRes({ response: "" });
          setFailed(true);
          console.log("error", error);
        });
    }
  }, [previousStep]);

  return <div ref={inputEl}>{res ? getresponse() : <Loading />}</div>;
};

export default CompetitionBotResponse;
