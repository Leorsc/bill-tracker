import { format } from 'date-fns';
import jsPDF from 'jspdf';
import handleValueFormat from '../../formatValue';
import generatorDateAndTime from '../generatorDateAndTime';
import generatorTitle from '../generatorTitle';
import printFormattedField from '../printFormattedField';

export default function generatorPDF(client) {
  console.log(client)
  // const doc = new jsPDF();
  // const startY = 20;
  // let currentY = startY;
  // const title = 'Relatório de Inadimplentes';

  // const logoDataUrl = '/images/bill-tracker-logo-white.png';
  // const width = 20;
  // const height = 20;
  // doc.addImage(logoDataUrl, 'PNG', 13, 10, width, height);

  // doc.setFontSize(18);
  // generatorTitle(doc, title, currentY)

  // doc.setFontSize(10);
  // const period = `Período: De ${dates.date_initial} à ${dates.date_final}`;
  // const periodWidth = doc.getStringUnitWidth(period) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  // const periodX = (doc.internal.pageSize.getWidth() - periodWidth) / 2;
  // doc.text(period, periodX, currentY + 5);

  // doc.setFontSize(8);
  // currentY += 20;

  // // Adicionar a data e hora de geração do relatório
  // generatorDateAndTime(doc)
  // doc.setFontSize(12)
  // doc.setFont("helvetica", "bold");
  // doc.text(`Total Geral Inadimplencia: ${handleValueFormat(total)}`, 15, currentY + 5);
  // doc.text(`Clientes Listados: ${client.length}`, 15, currentY + 10);
  // doc.text(`Total Qt. Títulos Inadimplentes: `, 15, currentY + 15);



  // currentY += 20;
  // doc.line(15, currentY, 200, currentY);

  // let clientsPerPage = 4;

  // client.map((client, index) => {
  //   // Verifique se é necessário adicionar uma nova página
  //   if (index > 0 && index % clientsPerPage === 0) {
  //     doc.addPage();
  //     currentY = startY;
  //     doc.addImage(logoDataUrl, 'PNG', 13, 10, width, height);

  //     doc.setFontSize(18);
  //     generatorTitle(doc, title, currentY)

  //     doc.setFontSize(10);
  //     const period = `Período: De ${dates.date_initial} à ${dates.date_final}`;
  //     const periodWidth = doc.getStringUnitWidth(period) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  //     const periodX = (doc.internal.pageSize.getWidth() - periodWidth) / 2;
  //     doc.text(period, periodX, currentY + 5);

  //     doc.setFontSize(8);
  //     const currentDate = new Date();
  //     const formattedDate = format(currentDate, 'dd/MM/yyyy');
  //     const formattedTime = format(currentDate, 'HH:mm:ss');

  //     const generatedAt = `Data: ${formattedDate}\nHora: ${formattedTime}`;
  //     const generatedAtWidth = doc.getStringUnitWidth(generatedAt) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  //     const generatedAtX = doc.internal.pageSize.getWidth() - generatedAtWidth;
  //     doc.text(generatedAt, generatedAtX, 15);

  //     currentY += 20;
  //     doc.setFontSize(12)
  //     doc.setFont("helvetica", "bold");
  //     doc.text(`Total Geral Inadimplencia: ${handleValueFormat(total)}`, 15, currentY + 5);
  //     doc.text(`Clientes Listados: ${client.length}`, 15, currentY + 10);
  //     doc.text(`Total Qt. Títulos Inadimplentes: `, 15, currentY + 15);

  //     currentY += 20;
  //     doc.line(15, currentY, 200, currentY);
  //   }


  //   const name = `Cliente: ${client.name}`;
  //   const email = `Email: ${client.email}`;
  //   const phone = `Telefone: ${client.phone?.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")}`;
  //   const cpf = `CPF: ${client?.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}`;
  //   const street = `Endereço: ${client.street ? client.street : ''}`;
  //   const city = `Município: ${client.city && client.state && client.zip_code ? client.city + ' - ' + client.state + ' - ' + client.zip_code.replace(/(\d{5})(\d{3})/, "$1-$2") : ''}`;
  //   const pendingAmount = `Valor Pendente: ${handleValueFormat(client.totalPending)}`
  //   const totalAmountDue = `Valor Devido: ${handleValueFormat(client.totalCharges)}`
  //   const delayedDays = `Dias em atraso: ${client.daysLate}`
  //   const amountOfCharges = `Qt. de cobranças: ${client.charges.length}`

  //   const col1X = 15;
  //   const col2X = 100;


  //   doc.setFontSize(10);
  //   printFormattedField(name, col1X, currentY + 10, doc)
  //   printFormattedField(email, col2X, currentY + 10, doc)
  //   printFormattedField(phone, col2X, currentY + 15, doc)
  //   printFormattedField(cpf, col1X, currentY + 15, doc)
  //   printFormattedField(street, col1X, currentY + 20, doc)
  //   printFormattedField(city, col2X, currentY + 20, doc)
  //   printFormattedField(pendingAmount, col1X, currentY + 30, doc)
  //   printFormattedField(totalAmountDue, col1X, currentY + 35, doc)
  //   printFormattedField(delayedDays, col1X, currentY + 40, doc)
  //   printFormattedField(amountOfCharges, col1X, currentY + 45, doc)

  //   currentY += 50;
  //   doc.line(15, currentY, 200, currentY);
  // });
  // doc.save('relatorio-inadimplentes.pdf');
}
