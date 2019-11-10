import React, { useState } from "react";
import ChatBot from "../../chatBot/ChatBot";
import BotDemoResponse from "./botDemoResponse";

const uuidv4 = require("uuid/v4");
let sessionId = uuidv4();

const Demo = () => {
  const [showParams, setShowParams] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [requirementKey, setRequirementKey] = useState(new Date());

  const steps = [
    {
      id: "welcome",
      message: "Type anything to get started!",
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
        <BotDemoResponse
          setSuccess={setSuccess}
          setFailed={setFailed}
          sessionId={sessionId}
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
      <ChatBot
        steps={steps}
        headerTitle="CoCo Demo"
        finishSuccess={success}
        finishFailed={failed}
        resetSession={reset}
        showParams={showParams}
        setShowParams={setShowParams}
        height="490px"
        width="350px"
        componentId="CoCo demo"
      />
    </div>
  );
};

export default Demo;
