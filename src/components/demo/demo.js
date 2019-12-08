import React, { useState, useEffect } from "react";
import ChatBot from "../../chatBot/ChatBot";
import BotDemoResponse from "./botDemoResponse";
import { narrate } from "coco-with-voice";

const uuidv4 = require("uuid/v4");
const ttsUrl = "https://voice-server-dot-coco-235210.appspot.com/tts";
const sttUrl = "https://voice-server-dot-coco-235210.appspot.com/stt";

let sessionId = uuidv4();

const Demo = () => {
  const [showParams, setShowParams] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [voice, setVoice] = useState(true);
  const [requirementKey, setRequirementKey] = useState(new Date());
  const [lastText, setLastText] = useState("");

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
          onResponse={setLastText}
          setSuccess={setSuccess}
          setFailed={setFailed}
          sessionId={sessionId}
        />
      ),
      waitAction: true,
      asMessage: true
    }
  ];

  useEffect(() => {
    voice && narrate(lastText, true, ttsUrl);
  }, [lastText]);

  const reset = () => {
    setSuccess(false);
    setFailed(false);
    sessionId = uuidv4();
    setRequirementKey(new Date());
  };

  return (
    <div
      key={requirementKey}
      className="d-flex justify-content-center py-5"
      // style={{ backgroundColor: "rgba(1, 166, 224, 1)" }}
    >
      <ChatBot
        steps={steps}
        headerTitle="CoCo Bot"
        finishSuccess={success}
        finishFailed={failed}
        resetSession={reset}
        showParams={showParams}
        setShowParams={setShowParams}
        height="490px"
        width="350px"
        componentId="CoCo Bot"
        voice={voice}
        setVoice={setVoice}
        sttUrl={sttUrl}
      />
    </div>
  );
};

export default Demo;
