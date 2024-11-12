export function convertISODate(isoDate: string): string {
    const date = new Date(isoDate);
    const now = new Date();
  
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });
  
    // Check if the date is today
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return formattedTime;
    }
  
    // Check if the date is within the current week
    const dayDifference = (now.getDay() + 7 - date.getDay()) % 7;
    const isThisWeek = dayDifference < now.getDay() && dayDifference >= 0;
  
    if (isThisWeek) {
      return dayOfWeek;
    }
  
    // For any other dates, return the formatted date (dd/mm/yyyy)
    return formattedDate;
}