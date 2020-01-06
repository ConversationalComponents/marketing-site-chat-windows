import React from "react";
import ChatWrapper from "../../chatBot/ChatWrapper";

const Scheduler = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ChatWrapper
        name="CoCo Scheduler"
        height="470px"
        width="320px"
        componentId="scheduler_vp3"
      />
    </div>
  );
};

export default Scheduler;
