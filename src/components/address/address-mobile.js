import React from "react";
import ChatWrapper from "../../chatBot/ChatWrapper";

const AddressMobile = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ChatWrapper
        name="CoCo Address"
        height="470px"
        width="320px"
        componentId="get_address_vp3"
      />
    </div>
  );
};

export default AddressMobile;
