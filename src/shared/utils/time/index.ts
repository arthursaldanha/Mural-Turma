const minutesToHour = (value: string | number) => {
  const minutesConvertedToNumber = Number(value);

  if (minutesConvertedToNumber < 60) {
    return `${minutesConvertedToNumber} min`;
  }

  const convertMinutesToHour = minutesConvertedToNumber / 60;
  const days = Math.ceil(convertMinutesToHour) / 24;

  if (convertMinutesToHour === 1) {
    return `${Math.ceil(convertMinutesToHour)} hora`;
  }

  if (
    Math.ceil(convertMinutesToHour) >= 24 &&
    Math.ceil(convertMinutesToHour) < 48
  ) {
    return '1 dia';
  }

  if (Math.ceil(convertMinutesToHour) >= 48) {
    return `${Math.floor(days)} dias`;
  }

  return `${Math.ceil(convertMinutesToHour)} horas`;
};

const formatTime = (timeInMinutes: number) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  const hoursLabel = hours > 1 ? 'horas' : 'hora';
  const minutesLabel = minutes > 1 ? 'minutos' : 'minuto';

  if (hours >= 48) return `${Math.floor(hours / 24)} dias`;
  if (hours >= 24) return `1 dia`;

  if (minutes === 0) return `${hours} ${hoursLabel}`;
  if (hours === 0) return `${minutes} ${minutesLabel}`;

  return `${hours} ${hoursLabel} e ${minutes} ${minutesLabel}`;
};

export { minutesToHour, formatTime };
