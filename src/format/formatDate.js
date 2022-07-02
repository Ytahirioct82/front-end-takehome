import { format } from "date-fns";
import moment from "moment";

const FormatDate = (number, type) => {
  if (number && type === "date") {
    const date = new Date(number);

    const formattedDate = format(date, "MMMM dd yyyy");

    return formattedDate;
  } else if (number && type === "time") {
    let newTime = moment.utc(number).format("HH");
    console.log(newTime);

    if (Number(newTime) > 11) {
      if (newTime == 12) {
        return newTime + ":00PM";
      } else {
        return Number(newTime - 12) + ":00PM";
      }
    } else {
      return newTime + ":00AM";
    }
  }
};

export default FormatDate;
