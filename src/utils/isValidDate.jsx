const isValidDate = (date) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) return false;
  const [year, month, day] = date.split("-").map(Number);
  const maxDaysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= maxDaysInMonth;
};

export { isValidDate };
