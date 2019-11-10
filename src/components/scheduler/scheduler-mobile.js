import React from "react";
import ChatWrapper from "../../chatBot/ChatWrapper";

const SchedulerMobile = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ChatWrapper
        name="CoCo Scheduler"
        height="490px"
        width="320px"
        componentId="scheduler_vp3"
      />
    </div>
  );
};

export default SchedulerMobile;
