interface DateFormat {
  profile: string;
  time: string;
  contacts: string;
  chat: string;
  receipt: string;
}

export function convertISODate(isoDate: string, format: keyof DateFormat): string {
  const date = new Date(isoDate);
  const now = new Date();

  // Format components
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const shortDayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });

  const formattedDateTime = date.toLocaleDateString('en-UK');

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString();

  // Check if the date is yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  // Check if the date is within the current week
  const isThisWeek = now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000 && now.getDay() >= date.getDay();

  // Format logic for each type
  const formats: DateFormat = {
    profile: isToday
      ? `Created Today at ${formattedTime}.`
      : `Created on ${shortDayOfWeek} at ${formattedTime}.`,
    time: formattedTime,
    contacts: isToday
      ? formattedTime
      : isYesterday
      ? "Yesterday"
      : isThisWeek
      ? dayOfWeek
      : formattedDate,
    chat: isToday
      ? "Today"
      : isYesterday
      ? "Yesterday"
      : isThisWeek
      ? dayOfWeek
      : `${shortDayOfWeek}, ${formattedDate}`,
    receipt: `${formattedDateTime} ${formattedTime}`
  };

  // Return the requested format
  return formats[format];
}
