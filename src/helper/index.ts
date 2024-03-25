export const truncateString = (str: string, returnLength: number = 10) => {
  if (str) {
    const formattedString = str.slice(0, returnLength);
    return str.length > formattedString.length
      ? formattedString + "..."
      : formattedString;
  }
};