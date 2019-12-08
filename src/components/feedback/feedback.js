import React from "react";
import ChatWrapper from "../../chatBot/ChatWrapper";

const Feedback = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ChatWrapper
        name="CoCo Feedback"
        height="490px"
        width="350px"
        componentId="complainer_vp3"
      />
    </div>
  );
};

export default Feedback;
