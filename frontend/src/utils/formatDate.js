export const formatDate = (date, config) => {
  const defaultOptions = { day: "2-digit", month: "2-digit", year: "2-digit" };
  const options = config ? config : defaultOptions;
  return new Date(date).toLocaleDateString("en-GB", options);
};
