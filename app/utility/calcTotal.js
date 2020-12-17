const price = (arr) => {
  let total = 0;
  arr.forEach((product) => {
    let price = parseInt(product.price);
    total += price * product.quantity;
  });
  return total;
};

const quantity = (arr) => {
  const reducer = (accumulator, currentValue) => {
    return {
      quantity: accumulator.quantity + currentValue.quantity,
    };
  };
  const total = arr.reduce(reducer);
  return total.quantity;
};

export default {
  price,
  quantity,
};
