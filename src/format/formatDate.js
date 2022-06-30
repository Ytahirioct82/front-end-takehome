import { format } from "date-fns";

const FormatDate = (number, type) => {
  if (number && type === "date") {
    const date = new Date(number);

    const formattedDate = format(date, "MMMM dd yyyy");

    return formattedDate;
  } else if (number && type === "time") {
    const date = new Date(number);

    let formattedDate = format(date, "H:mma");
    if (formattedDate.slice(5, 7) === "PM") {
      formattedDate = Number(formattedDate.slice(0, 2)) - 12 + formattedDate.slice(2);
    }

    return formattedDate;
  }
};

export default FormatDate;
