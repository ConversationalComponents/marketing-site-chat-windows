import React, { useEffect, useState } from "react";
import Loading from "../steps_components/common/Loading";
import Box from "@material-ui/core/Box";

const Params = ({ steps, triggerNextStep }) => {
  const [params, setParams] = useState(null);

  useEffect(() => {
    if (steps.json.value.updated_context) {
      setParams(steps.json.value.updated_context);
    }
  }, []);

  useEffect(() => {
    if (params) {
      triggerNextStep({ trigger: "get_user_input" });
    }
  }, [params]);

  const printParams = params => {
    let myParams = [];
    Object.keys(params).forEach(function(item) {
      if (typeof params[item] === "object") {
        const insideObj = params[item];
        Object.keys(insideObj).forEach(function(obj) {
          myParams.push(
            <p key={`${item}.${obj}`} style={{ margin: 0, padding: 0 }}>
              <span style={{ color: "#9c27b0" }}>
                {item}.{obj}:
              </span>{" "}
              <span style={{ color: "#01A6E0" }}>{insideObj[obj]}</span>
            </p>
          );
        });
      } else {
        myParams.push(
          <p key={item} style={{ margin: 0, padding: 0 }}>
            <span style={{ color: "#9c27b0" }}>{item}:</span>{" "}
            <span style={{ color: "#01A6E0" }}>{params[item]}</span>
          </p>
        );
      }
    });
    return myParams;
  };

  return (
    <Box>
      {params ? (
        <div style={{ marginTop: "-8px", padding: 0 }}>
          {printParams(params)}
        </div>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default Params;
