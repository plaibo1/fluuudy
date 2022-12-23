export const arrayObjectIndexOf = (
  myArray: any[],
  searchTerm: string,
  property: string
) => {
  for (let i = myArray.length - 2; i > 0; i--) {
    if (myArray[i][property] === searchTerm) {
      return i;
    }
  }
  return -1;
};