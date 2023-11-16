const months = [
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

export const formatTimestamp = (val) => {
  const separate_date_time = val?.split(" ");
  const separated_date = separate_date_time[0]?.split("-");
  const time = separate_date_time[1];
  const date = `${separated_date[2]} ${months[separated_date[1] - 1]} ${
    separated_date[0]
  }`;
  return `val ${val} date ${date} time ${time}`;
};
