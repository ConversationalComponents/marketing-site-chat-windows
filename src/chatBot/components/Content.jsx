import React, { useEffect, useRef } from "react";

const Content = ({ children, height, onNodeInserted, showParams }) => {
  const conteiner = useRef(null);

  useEffect(() => {
    conteiner.current.addEventListener("DOMNodeInserted", onNodeInserted);
    return () => {
      conteiner.current.removeEventListener("DOMNodeInserted", onNodeInserted);
    };
  }, []);

  useEffect(() => {
    conteiner.current.scrollTop = conteiner.current.scrollHeight;
  }, [showParams]);

  return (
    <div
      ref={conteiner}
      style={{
        height: `calc(${height} - 112px)`,
        overflowY: "scroll",
        marginTop: "2px",
        paddingTop: "6px"
      }}
    >
      {children}
    </div>
  );
};

export default Content;
