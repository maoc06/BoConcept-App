// American Express : Starting with 34 or 37, length 15 digits.
// Visa : Starting with 4, length 13 or 16 digits.
// MasterCard : Starting with 51 through 55, length 16 digits.

// const amex = /^(?:3[47])$/;
// const visa = /^(?:4[0-9])$/;
// const masterCard = /^(?:5[1-5])$/;
const amex = /^(?:3[47][0-9]{13})$/;
const visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterCard = /^(?:5[1-5][0-9]{14})$/;

export const identifyPayment = (value) => {
  if (value.match(amex)) {
    return 1;
  } else if (value.match(visa)) {
    return 2;
  } else if (value.match(masterCard)) {
    return 3;
  } else {
    return -1;
  }
};
