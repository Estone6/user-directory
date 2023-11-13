export const formatDateTime = (selectedCountry, time) => {
  let formattedTime;
  try {
    formattedTime = new Intl.DateTimeFormat(undefined, {
      timeZone: selectedCountry,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(time);
  } catch (error) {
    console.error("Invalid time zone specified:", error);
    formattedTime = time.toLocaleTimeString();
  }
  return formattedTime;
};
