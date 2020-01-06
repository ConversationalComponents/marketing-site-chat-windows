import React from "react";
import ChatWrapper from "../../chatBot/ChatWrapper";

const FeedbackMobile = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ChatWrapper
        name="CoCo Feedback"
        height="470px"
        width="320px"
        componentId="complainer_vp3"
      />
    </div>
  );
};

export default FeedbackMobile;
