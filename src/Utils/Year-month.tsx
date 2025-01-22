export function getMonthAndYearFromDate({date,t}) {
    const dateCreate = new Date(date);
    const month = dateCreate.getMonth() + 1; 
    const year = dateCreate.getFullYear();
    const day=dateCreate.getDay();

    return  ` ${year} / ${month} /${day}`;
  }
  