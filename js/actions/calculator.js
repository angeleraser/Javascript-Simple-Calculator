import { hasNumbers, hasTheOperators, isOperator } from "../helpers/helpers.js";
import { dispatch, getState } from "../store/store.js";
import { TYPES } from "../types/types.js";

export const handleInputValue = (val) => {
  return {
    type: TYPES.handleInputValue,
    payload: val,
  };
};

export const replaceLastOperator = () => {
  return {
    type: TYPES.replaceLastOperator,
  };
};

export const resetAll = () => {
  return {
    type: TYPES.resetAll,
  };
};

export const resetFormula = () => {
  return {
    type: TYPES.resetFormula,
  };
};

export const resetDisplay = () => {
  return {
    type: TYPES.resetDisplay,
  };
};

export const writeFormula = () => {
  return {
    type: TYPES.writeFormula,
  };
};

export const evalFormula = () => {
  return {
    type: TYPES.evaluateFormula,
  };
};

export const handleKeysPressed = (type) => {
  switch (type) {
    case "operator":
      return (key) => {
        switch (key) {
          case ".":
            handleDecimalKeyPress(key);
            break;
          case "=":
            handleEqualKeyPress(key);
            break;
          default: {
            handleOperatorKeyPress(key);
            break;
          }
        }
      };
    case "number":
      return (key) => {
        dispatch(handleInputValue(key));
      };
    case "clear":
      return () => {
        dispatch(resetAll());
      };
    default:
      break;
  }
};

const handleOperatorKeyPress = (operator) => {
  const { display, done, formula } = getState().calculator;
  const [last, pen] = formula.split("").reverse();
  dispatch(handleInputValue(operator));
  if (hasNumbers(display)) {
    if (done) dispatch(resetFormula());
    if (display.length === 1 && display !== "0") {
      dispatch(writeFormula());
    } else if (display.length >= 1 && display !== "0") {
      dispatch(writeFormula());
    } else if (done && hasNumbers(display)) {
      dispatch(writeFormula());
    }
  } else if (!isOperator(pen) && last !== operator) {
    switch (true) {
      case hasTheOperators(last, "/", "*"):
        if (hasTheOperators(operator, "+", "-")) {
          dispatch(writeFormula());
        } else {
          dispatch(replaceLastOperator());
        }
        break;
      case hasTheOperators(last, "+", "-"):
        if (hasTheOperators(operator, "*", "/")) {
          dispatch(replaceLastOperator());
        } else {
          dispatch(writeFormula());
        }
      default:
        break;
    }
  } else if (isOperator(last) && isOperator(pen)) {
    dispatch(replaceLastOperator());
  }
};

const handleEqualKeyPress = () => {
  const { done, display } = getState().calculator;
  if (done) {
    dispatch(resetFormula());
  } else if (hasNumbers(display)) {
    dispatch(evalFormula());
  }
};

const handleDecimalKeyPress = (key) => {
  const { display } = getState().calculator,
    [last] = display.split("").reverse();
  if (last !== "." && !/[.]/g.test(display)) {
    dispatch(handleInputValue(key));
  }
};
