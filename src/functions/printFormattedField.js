export default function printFormattedField(field, x, y, doc) {
  const [description, value] = field.split(":");
  const descriptionWidth = doc.getStringUnitWidth(description) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const spacing = 4;

  doc.setFont("helvetica", "bold");
  doc.text(`${description}:`, x, y);
  doc.setFont("helvetica", "normal");
  doc.text(value.trim(), x + descriptionWidth + spacing, y);
}



