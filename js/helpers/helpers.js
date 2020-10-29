export const parseLeadingOrEndInvalidValues = (str) => {
  const splittedStr = str.split("");
  if (/^[0*/+-.]/.test(str)) {
    return splittedStr.slice(1).join("");
  } else {
    return str;
  }
};

export const parseLeadingZero = (str) => {
  const splittedStr = str.split("");
  if (/^[0/*]/.test(str)) {
    return splittedStr.slice(1).join("");
  } else {
    return str;
  }
};

export const isOperator = (val) => /[*/+.-]/g.test(val);

export const hasTheOperators = (str, ...operators) => {
  const operatorsRegExp = new RegExp(`[${operators.join("")}]`, "g");
  return operatorsRegExp.test(str);
};

export const hasNumbers = (val) => /\d/g.test(val);

export const deleteLastOperator = (formula) => {
  let newFormula = formula.split(""),
    opCount = formula.length - 1;
  while (isOperator(newFormula[opCount])) {
    newFormula = newFormula.filter((_, index) => index !== opCount);
    opCount -= 1;
  }
  return newFormula.join("");
};

export const getZeroIfOnlyOperator = (val) => {
  if (val.length === 1 && /[*/+.-]/g.test(val)) {
    return 0;
  } else {
    return val;
  }
};

export const parseLargeDigits = (digits) => {
  return digits.length > 14 ? Number(digits).toFixed(12) - 0 : digits;
};
