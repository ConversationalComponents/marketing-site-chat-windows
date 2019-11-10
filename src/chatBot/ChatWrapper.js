import React, { useState, useEffect } from "react";
import ChatBot from "./ChatBot";
import BotTextResponse from "./custom_components/BotTextResponse";
import Params from "./custom_components/Params";
import JsonView from "./custom_components/JsonView";
const uuidv4 = require("uuid/v4");

const ChatWrapper = ({ height, width, name, componentId }) => {
  const [success, setSuccess] = useState(false);
  const [showParams, setShowParams] = useState(true);
  const [requirementKey, setRequirementKey] = useState(new Date());
  const [failed, setFailed] = useState(false);
  const [steps, setSteps] = useState([]);
  let sessionId = uuidv4();

  const reset = () => {
    sessionId = uuidv4();
    setSuccess(false);
    setFailed(false);
    setRequirementKey(new Date());
  };

  useEffect(() => {
    if (sessionId && componentId) {
      setSteps([
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
            <BotTextResponse
              setSuccess={setSuccess}
              setFailed={setFailed}
              sessionId={sessionId}
              componentId={componentId}
            />
          ),
          waitAction: true,
          asMessage: true
        },
        {
          id: "params",
          component: <Params />,
          waitAction: true,
          delay: 500
        },
        {
          id: "json",
          component: <JsonView />,
          waitAction: true,
          delay: 100
        }
      ]);
    }
    return () => {
      reset();
    };
  }, [componentId]);

  return (
    <div key={requirementKey}>
      {steps.length > 0 && (
        <ChatBot
          steps={steps}
          headerTitle={name}
          finishSuccess={success}
          finishFailed={failed}
          resetSession={reset}
          height={height}
          width={width}
          showParams={showParams}
          setShowParams={setShowParams}
          componentId={componentId}
        />
      )}
    </div>
  );
};

export default ChatWrapper;
