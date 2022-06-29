const FormatTime = (number) => {
  if (number) {
    let formatted = "";

    if (Number(number.slice(11, 13)) === 0) {
      formatted = "12" + number.slice(13, 16) + " " + "AM";
    } else if (Number(number.slice(11, 13)) > 12) {
      formatted = Number(number.slice(11, 13)) - 12 + number.slice(13, 16) + " " + "PM";
    } else {
      formatted = number.slice(11, 16) + " " + "AM";
    }
    console.log(formatted);
    return formatted;
  }
};

export default FormatTime;
