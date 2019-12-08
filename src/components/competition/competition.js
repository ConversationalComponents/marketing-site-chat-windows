import React, { useState, useEffect } from "react";
import ChatBot from "../../chatBot/ChatBot";
import CompetitionBotResponse from "./competitionBotResponse";
import { narrate } from "coco-with-voice";

const uuidv4 = require("uuid/v4");
const ttsUrl = "https://voice-server-dot-coco-235210.appspot.com/tts";
const sttUrl = "https://voice-server-dot-coco-235210.appspot.com/stt";
const componentId = "competition_vp3";
let sessionId = uuidv4();

const Competition = () => {
  const [showParams, setShowParams] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [voice, setVoice] = useState(false);
  const [requirementKey, setRequirementKey] = useState(new Date());
  const [lastText, setLastText] = useState("");

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
          onResponse={setLastText}
          setFailed={setFailed}
          sessionId={sessionId}
          componentId={componentId}
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
          voice={voice}
          setVoice={setVoice}
          sttUrl={sttUrl}
        />
      )}
    </div>
  );
};

export default Competition;
