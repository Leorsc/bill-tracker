import handleDateFormat from '@/functions/formatDate';
import handleValueFormat from '@/functions/formatValue';
import handleSelectStatusType from '@/functions/selectStatusType';
import handleTextLimiter from '@/functions/textLimiter';
import jsPDF from 'jspdf';
import generatorDateAndTime from '../generatorDateAndTime';
import generatorTitle from '../generatorTitle';
import generetorDateNameFile from '../generetorDateNameFile';
import printFormattedField from '../printFormattedField';

export default function generatorPDF(charges_details) {
  const doc = new jsPDF();
  const startY = 20;
  let currentY = startY;
  const title = 'Recibo de Cobrança';

  const logoDataUrl = '/images/bill-tracker-logo-white.png';
  const width = 20;
  const height = 20;
  doc.addImage(logoDataUrl, 'PNG', 13, 10, width, height);

  doc.setFontSize(18);
  generatorTitle(doc, title, currentY)

  doc.setFontSize(8);
  generatorDateAndTime(doc)

  currentY += 10;
  const name = `Cliente: ${charges_details.name}`;
  const email = `Email: ${charges_details.email}`;
  const clientCode = `Código do Cliente: ${charges_details.id}`
  const phone = `Telefone: ${charges_details.phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")}`;
  const cpf = `CPF: ${charges_details.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}`;
  const street = `Endereço: ${charges_details.street ? charges_details.street : ''}`;
  const complement = `Complemento: ${charges_details.complement ? charges_details.complement : ''}`;
  const city = `Município: ${charges_details.city && charges_details.state && charges_details.zip_code ? charges_details.city + ' - ' + charges_details.state + ' - ' + charges_details.zip_code.replace(/(\d{5})(\d{3})/, "$1-$2") : ''}`;

  const col1X = 15;
  const col2X = 100;


  doc.setFontSize(10);
  printFormattedField(name, col1X, currentY + 10, doc)
  printFormattedField(clientCode, col2X, currentY + 10, doc)
  printFormattedField(email, col1X, currentY + 15, doc)
  printFormattedField(phone, col2X, currentY + 15, doc)
  printFormattedField(cpf, col1X, currentY + 20, doc)
  printFormattedField(street, col2X, currentY + 20, doc)
  printFormattedField(city, col1X, currentY + 25, doc)
  printFormattedField(complement, col2X, currentY + 25, doc)

  currentY += 30
  doc.line(15, currentY, 200, currentY);
  const charge = charges_details.charges[0]
  const description = `Descrição: ${handleTextLimiter(charge.description, 100)}`
  const dateDue = `Data de vencimento: ${handleDateFormat(charge.due_date)}`
  const value = `Valor: ${handleValueFormat(charge.value)}`
  const status = `Situação: ${handleSelectStatusType(charge.status, charge.due_date)}`


  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Detalhes da Cobrança - ${charge.id}`, 15, currentY + 10);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  printFormattedField(description, 15, currentY + 20, doc);
  printFormattedField(dateDue, 15, currentY + 25, doc);
  printFormattedField(value, 15, currentY + 30, doc);
  printFormattedField(status, 15, currentY + 35, doc);

  currentY += 40
  doc.line(15, currentY, 200, currentY);

  doc.save(`BILLTRACKER_${charges_details.id}_${charges_details.charges[0].id}_${generetorDateNameFile()}.pdf`);
}
