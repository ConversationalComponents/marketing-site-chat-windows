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
        height="490px"
        width="350px"
        componentId="scheduler_vp3"
      />
    </div>
  );
};

export default Scheduler;
