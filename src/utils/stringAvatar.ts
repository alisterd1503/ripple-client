function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export default function stringAvatar(name: string) {
  const nameParts = name.split(' ');

  // If there is only one part, use it for both initials
  const firstInitial = nameParts[0][0];
  const secondInitial = nameParts.length > 1 ? nameParts[1][0] : '';

  return {
      sx: {
          bgcolor: stringToColor(name),
      },
      children: `${firstInitial}${secondInitial}`,
  };
}
