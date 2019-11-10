import React from "react";
import ChatWrapper from "../../chatBot/ChatWrapper";

const Address = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ChatWrapper
        name="CoCo Address"
        height="490px"
        width="350px"
        componentId="get_address_vp3"
      />
    </div>
  );
};

export default Address;
