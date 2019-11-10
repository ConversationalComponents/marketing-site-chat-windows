import React, { useState } from "react";
import ChatBot from "../../chatBot/ChatBot";
import CompetitionBotResponse from "./competitionBotResponse";

const uuidv4 = require("uuid/v4");
const componentId = "competition_vp3";
let sessionId = uuidv4();

const Competition = () => {
  const [showParams, setShowParams] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [requirementKey, setRequirementKey] = useState(new Date());

  const steps = [
    {
      id: "welcome",
      message:
        "So my friend, have you heard about CoCo's Chatbot Competition in Berlin this December?",
      trigger: "get_user_input"
    },
    {
      id: "get_user_input",
      user: true,
      trigger: "custom"
    },
    {
      id: "custom",
      component: (
        <CompetitionBotResponse
          setFailed={setFailed}
          sessionId={sessionId}
          componentId={componentId}
        />
      ),
      waitAction: true,
      asMessage: true
    }
  ];

  const reset = () => {
    setSuccess(false);
    setFailed(false);
    sessionId = uuidv4();
    setRequirementKey(new Date());
  };

  return (
    <div key={requirementKey} className="d-flex justify-content-center py-5">
      {steps.length > 0 && (
        <ChatBot
          steps={steps}
          headerTitle="CoCo's Chatbot Competition"
          finishSuccess={success}
          finishFailed={failed}
          resetSession={reset}
          showParams={showParams}
          setShowParams={setShowParams}
          height="490px"
          width="350px"
          componentId={componentId}
        />
      )}
    </div>
  );
};

export default Competition;
