export default function handleDateFormatSimple(date) {
  const parts = date.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}