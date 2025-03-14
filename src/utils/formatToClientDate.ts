export const formatToClientDate = (date?: string | Date) => {
  if (!date) {
    return "";
  }

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate.toLocaleDateString();
};
