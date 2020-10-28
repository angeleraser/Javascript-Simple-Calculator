import { Calculator } from "../components/Calculator.js";
import { calculatorReducer } from "../reducers/reducers.js";
const { createStore, combineReducers } = Redux;
const reducers = combineReducers({
  calculator: calculatorReducer,
});
const store = createStore(reducers);
const render = () => {
  const { calculator } = getState();
  Calculator.updateCurrentInput(calculator.display);
  Calculator.updateFormula(calculator.formula);
  console.log(calculator);
};
export const { subscribe: onUpdateStore, getState, dispatch } = store;
onUpdateStore(render);
Calculator.keyboardOnEventListener();
