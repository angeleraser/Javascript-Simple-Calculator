import { handleKeysPressed } from "../actions/calculator.js";
const keyboard = document.getElementById("keyboard"),
  currentInput = document.getElementById("display"),
  formula = document.getElementById("formula");
export const Calculator = {
  currentInput,
  formula,
  keyboard,
  keyboardOnEventListener() {
    this.keyboard.addEventListener("click", ({ target: { dataset } }) => {
      const datasetName = Object.keys(dataset)[0] || null;
      if (datasetName) {
        const keyValue = dataset[datasetName];
        handleKeysPressed(datasetName)(keyValue);
      }
    });
  },
  updateFormula(formula) {
    this.formula.innerText = formula;
  },
  updateCurrentInput(value) {
    this.currentInput.innerText = value;
  },
};
