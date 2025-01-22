export function convertYearsToYearsAndMonths(years) {
    const fullYears = Math.floor(years);
    const remainingMonths = Math.round((years - fullYears) * 12);
    return `${fullYears} سنة : ${remainingMonths} شهر`;
  }
  