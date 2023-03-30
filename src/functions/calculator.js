const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const totalAmount = (loan_amount, product_interest) => {
  return (
    parseFloat(loan_amount) +
    parseFloat(loan_amount) / parseFloat(product_interest)
  );
};

export const monthlyInstallment = (
  loan_amount,
  num_of_months,
  product_interest
) => {
  return totalAmount(loan_amount, product_interest) / parseInt(num_of_months);
};

export const targetMonth = (num_of_months) => {
  return addMonths(num_of_months);
};

function addMonths(months) {
  var d = new Date();
  d.setMonth(d.getMonth() + months);
  return monthNames[d.getMonth()] + " " + d.getFullYear();
}
