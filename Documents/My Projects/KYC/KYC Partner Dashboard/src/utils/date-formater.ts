import moment from 'moment';

export function formatDate(isoDateString: string) {
  // Create a moment object from the ISO date string
  const date = moment(isoDateString);

  // Format the date as DD/MMM/YYYY HH:MM:SS
  return date.format('DD/MMM/YYYY   HH:mm:ss');
}

export function getLastNDaysDates(n: number): {
  customStartDate: string;
  customEndDate: string;
} {
  // Helper function to format a date as dd-mm-yyyy
  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  // Get the current date
  const endDate = new Date();

  // Calculate the start date
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - n);

  return {
    customStartDate: formatDate(startDate),
    customEndDate: formatDate(endDate),
  };
}
