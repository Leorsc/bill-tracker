import { format } from 'date-fns';

export default function generatorDateAndTime(doc) {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd/MM/yyyy');
  const formattedTime = format(currentDate, 'HH:mm:ss');

  const generatedAt = `Data: ${formattedDate}\nHora: ${formattedTime}`;
  const generatedAtWidth = doc.getStringUnitWidth(generatedAt) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const generatedAtX = doc.internal.pageSize.getWidth() - generatedAtWidth;
  return doc.text(generatedAt, generatedAtX, 15);
}
