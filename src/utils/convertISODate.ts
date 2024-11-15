interface DateFormat {
  profile: string;
  chat: string;
  contacts: string;
}

export function convertISODate(isoDate: string, format: keyof DateFormat): string {
  const date = new Date(isoDate);
  const now = new Date();

  // Format components
  const formattedDate = date.toLocaleDateString('en-GB');
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const shortDayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString();

  // Check if the date is yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  // Check if the date is within the current week
  const dayDifference = (now.getDay() + 7 - date.getDay()) % 7;
  const isThisWeek = dayDifference < now.getDay() && dayDifference >= 0;

  // Format logic for each type
  const formats: DateFormat = {
    profile: isToday
      ? `Created Today at ${formattedTime}.`
      : `Created on ${shortDayOfWeek} at ${formattedTime}.`,
    chat: formattedTime,
    contacts: isToday
      ? formattedTime
      : isYesterday
      ? "Yesterday"
      : isThisWeek
      ? dayOfWeek
      : formattedDate,
  };

  // Return the requested format
  return formats[format];
}
