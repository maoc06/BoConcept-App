import numbro from 'numbro';

export const currencyFormat = (value) =>
  numbro(value).formatCurrency({thousandSeparated: true});
