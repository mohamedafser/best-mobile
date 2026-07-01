export const totalHotelCalc = (tax: number, sellingPrice: number) => {
  return ((tax || 0) + sellingPrice).toFixed(2) as unknown as number;
};

export const totalHotelCoinRedeemtion = (
  redemtionAmount: number,
  grandTotal: number,
): number => {
  return (grandTotal - (redemtionAmount || 0)).toFixed(2) as unknown as number;
};
