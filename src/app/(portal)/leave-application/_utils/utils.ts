export function calculateWorkingDays(startDate: Date, endDate: Date) {
  let currentDate = new Date(startDate);
  let totalWorkingDays = 0;

  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0) {
      totalWorkingDays++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return totalWorkingDays;
}
