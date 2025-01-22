 
export function GetMax15Values({array,key}) {
    const sortedArray = array.sort((a, b) => b?.[key] - a?.[key]);
    return sortedArray.slice(0, 15);
  }
  