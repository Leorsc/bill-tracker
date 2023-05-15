export default function handleValueFormat(value) {
  const valor = (value / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `R$ ${valor}`;
}