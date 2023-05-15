export default function handleDateFormat(date) {
  const dateIndex = date.indexOf('T');
  const datePart = date.substr(0, dateIndex);
  const parts = datePart.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}