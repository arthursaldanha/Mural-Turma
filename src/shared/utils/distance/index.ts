export const metersToKilometers = (value: string | number) => {
  const distance = Number(value);

  const distanceInKm = distance / 1000;

  return `${distanceInKm.toFixed(1)} Km`;
};
