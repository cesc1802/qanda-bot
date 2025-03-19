// Function returning separate date and time
export function formatDateTime(date = new Date()) {
  // Format the date part (DD/MM/YYYY)
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear();

  // Format the time part (HH:MM:SS)
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}

// Example usage
// const { date, time } = formatDateTime();
// console.log(date); // "19/03/2025"
// console.log(time); // "16:02:00"
