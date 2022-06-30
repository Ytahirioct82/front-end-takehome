const FormatPhoneNumber = (number) => {
  let formatted = "";
  if (number) {
    formatted = `(${number.slice(0, 3)}) $${number.slice(3, 6)}-${number.slice(6)}`;
  }
  return formatted;
};

export default FormatPhoneNumber;
