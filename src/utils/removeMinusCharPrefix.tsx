export const removeMinusCharPrefix = (inputNumber: number): number => {
  let numberString: string = inputNumber.toString();

  if (numberString.startsWith("-")) {
    numberString = numberString.slice(1);
  }

  return parseInt(numberString);
};
