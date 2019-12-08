import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bubble from "./Bubble";
import Image from "./Image";
import ImageContainer from "./ImageContainer";
import Loading from "../common/Loading";
import TextStepContainer from "./TextStepContainer";

const TextStep = props => {
  const [loading, setloading] = useState(true);
  const [userVoice, setUserVoice] = useState("");
  const [updated, setUpdated] = useState(false);
  const {
    step,
    triggerNextStep,
    isFirst,
    isLast,
    userVoiceMessage,
    cleanUserVoiveMessage
  } = props;
  const { component, delay, waitAction, avatar, user, voice } = step;
  const isComponentWatingUser = component && waitAction;

  useEffect(() => {
    if (!voice) {
      setTimeout(() => {
        setloading(false);
        if (!isComponentWatingUser && !step.rendered) {
          triggerNextStep();
        }
      }, delay);
    }
  }, []);

  useEffect(() => {
    if (voice && userVoiceMessage) {
      if (!updated) {
        setUpdated(true);
        setUserVoice(userVoiceMessage);
        setloading(false);
        if (!isComponentWatingUser && !step.rendered) {
          triggerNextStep({
            value: { voiceMessage: userVoiceMessage }
          });
          cleanUserVoiveMessage();
        }
      }
    }
  }, [userVoiceMessage]);

  const getMessage = () => {
    const { message } = props.step;
    if (voice) {
      return userVoice;
    } else {
      return message;
    }
  };

  const renderMessage = () => {
    const { step, steps, previousStep, triggerNextStep } = props;
    const { component } = step;

    if (component) {
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep
      });
    }

    return getMessage();
  };

  return (
    <TextStepContainer user={user} step={step}>
      <ImageContainer user={user}>
        {isFirst && <Image user={user} src={avatar} />}
      </ImageContainer>
      <Bubble user={user} isFirst={isFirst} isLast={isLast}>
        {loading ? <Loading /> : renderMessage()}
      </Bubble>
    </TextStepContainer>
  );
};

TextStep.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  previousStep: PropTypes.objectOf(PropTypes.any),
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  steps: PropTypes.objectOf(PropTypes.any),
  triggerNextStep: PropTypes.func.isRequired
};

TextStep.defaultProps = {
  previousStep: {},
  previousValue: "",
  steps: {}
};

export default TextStep;
