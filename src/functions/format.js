const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  //   useGrouping: false,
});
const USDollarWithoutCurrencySymbol = new Intl.NumberFormat("en-US", {
  currency: "USD",
});
export const formatCurrency = (amount, showCurrency = true) => {
  return !showCurrency
    ? USDollarWithoutCurrencySymbol.format(amount)
    : USDollar.format(amount);
};
