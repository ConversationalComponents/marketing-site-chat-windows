import React, { useEffect, useState, useRef } from "react";
import ReactJson from "react-json-view";
import { Popover, Overlay, ButtonToolbar } from "react-bootstrap";

const JsonView = ({ steps, triggerNextStep, modalSm }) => {
  const [json, setJson] = useState(null);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(0);

  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    if (steps.custom.value) {
      setWidth(steps.custom.value.width + 12);
      setJson(steps.custom.value.res);
    }
  }, []);

  useEffect(() => {
    if (json) {
      let isObjEmpty = false;
      if (steps.custom.value.res.updated_context) {
        isObjEmpty =
          Object.entries(steps.custom.value.res.updated_context).length === 0 &&
          steps.custom.value.res.updated_context.constructor === Object;
      }
      if (steps.custom.value.res.component_done) {
        if (!isObjEmpty) {
          triggerNextStep({
            trigger: "params",
            value: steps.custom.value.res
          });
        }
      } else {
        if (isObjEmpty) {
          triggerNextStep({ trigger: "get_user_input" });
        } else {
          triggerNextStep({
            trigger: "params",
            value: steps.custom.value.res
          });
        }
      }
    }
  }, [json]);

  return (
    <React.Fragment>
      <ButtonToolbar ref={ref}>
        <button
          onClick={handleClick}
          type="button"
          data-container="body"
          data-toggle="popover"
          data-placement="right"
          data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          className="d-flex btn justify-content-center align-items-center json-custom-component"
          style={{
            height: "27px",
            width: "27px",
            marginLeft: width,
            marginTop: "-31px",
            backgroundColor: "#9c27b0",
            borderRadius: "50%",
            cursor: "pointer"
          }}
        >
          <i style={{ fontSize: "12px" }} className="fas fa-code text-light" />
        </button>

        <Overlay
          onHide={() => setShow(false)}
          show={show}
          target={target}
          placement="top-end"
          container={ref.current}
          containerPadding={20}
          rootClose={true}
        >
          <Popover id="popover-contained">
            <Popover.Title as="h3">
              <div className="d-flex justify-content-between align-items-center">
                <span>Json response</span>
                <span
                  onClick={handleClick}
                  className="close"
                  aria-label="Close"
                  style={{ cursor: "pointer" }}
                >
                  <span aria-hidden="true">&times;</span>
                </span>
              </div>
            </Popover.Title>
            <Popover.Content>
              {json && (
                <ReactJson
                  style={{ maxHeight: "270px", overflowY: "scroll" }}
                  src={json}
                  name={false}
                  enableClipboard={false}
                  displayDataTypes={false}
                />
              )}
              <button
                onClick={handleClick}
                className="btn btn-secondary btn-sm btn-block mt-3"
              >
                Close
              </button>
            </Popover.Content>
          </Popover>
        </Overlay>
      </ButtonToolbar>
    </React.Fragment>
  );
};

export default JsonView;
