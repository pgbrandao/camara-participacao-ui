export const formattedNumber = (number) => {
  return number.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const formatPercentage = (percentage: number) => String((percentage*100).toFixed(0)) + " %";
export const formatPercentagePrecise = (percentage: number) => String((percentage*100).toFixed(2)).replace(".", ",") + " %";
