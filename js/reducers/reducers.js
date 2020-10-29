import {
  deleteLastOperator,
  getZeroIfOnlyOperator,
  parseLeadingZero,
  hasTheOperators,
  parseLargeDigits,
  parseLeadingOrEndInvalidValues,
} from "../helpers/helpers.js";
import { TYPES } from "../types/types.js";
const initState = {
  display: "0",
  formula: "",
  result: 0,
  done: false,
};
export const calculatorReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.handleInputValue:
      return {
        ...state,
        display: state.done
          ? state.display + action.payload
          : hasTheOperators(
              state.formula[state.formula.length - 1],
              "+",
              "-",
              "/",
              "*"
            )
          ? parseLeadingOrEndInvalidValues(state.display + action.payload)
          : parseLeadingZero(state.display + action.payload),
      };
    case TYPES.writeFormula:
      return {
        ...state,
        formula: state.formula + state.display,
        display: state.display.split("")[state.display.length - 1],
      };
    case TYPES.evaluateFormula:
      const operation = state.formula + getZeroIfOnlyOperator(state.display);
      const opResult = eval(operation) + "";
      return {
        ...state,
        done: true,
        display: parseLargeDigits(opResult),
        formula: `${operation}=${parseLargeDigits(opResult)}`,
        result: parseLargeDigits(opResult),
      };
    case TYPES.replaceLastOperator:
      return {
        ...state,
        formula:
          deleteLastOperator(state.formula) +
          state.display.split("")[state.display.length - 1],
      };
    case TYPES.resetFormula:
      return {
        ...state,
        formula: "",
        done: false,
      };
    case TYPES.resetDisplay:
      return {
        ...state,
        display: "0",
      };
    case TYPES.resetAll:
      return initState;
    default:
      return state;
  }
};
