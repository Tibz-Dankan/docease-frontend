export const truncateString = (str: string, charLength?: number): string => {
  const maxLength = charLength ? charLength : 28;

  if (!str) return "";

  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength) + "...";
};
