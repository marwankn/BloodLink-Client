export function formatToYYYYMMDD(input) {
  // Remove non-numeric characters
  const formattedDate = input.replace(/\D/g, "");

  // Extract year, month, and day from the input
  let year = formattedDate.slice(0, 4);
  let month = formattedDate.slice(4, 6);
  let day = formattedDate.slice(6, 8);

  // Ensure the year is limited to 4 digits
  if (year.length > 4) {
    year = year.slice(0, 4);
  }

  // Ensure the month is limited to 2 digits (01-12)
  if (month.length > 2) {
    month = month.slice(0, 2);
  }

  // Ensure the day is limited to 2 digits (01-31)
  if (day.length > 2) {
    day = day.slice(0, 2);
  }

  // Return the formatted date as `yyyy-mm-dd`
  return `${year}-${month}-${day}`;
}
