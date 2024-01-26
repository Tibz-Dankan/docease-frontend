export const truncateString = (str: string): string => {
  const maxLength = 28;

  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength) + "...";
};
