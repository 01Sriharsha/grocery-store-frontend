
//calculate price per Kg for total quantity
export const calculatePricePerKg = (totalQuantity, totalPrice) => {
  const pricePerKg = totalPrice / totalQuantity;
  console.log(pricePerKg);
  return pricePerKg;
};
