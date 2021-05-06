const formattedNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export { formattedNumber }