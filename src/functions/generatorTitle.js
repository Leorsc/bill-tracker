export default function generatorTitle(doc, title, currentY) {
  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
  return doc.text(title, titleX, currentY);
}
