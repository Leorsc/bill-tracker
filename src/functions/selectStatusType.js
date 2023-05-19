export default function handleSelectStatusType(value, date) {
  const today = new Date();

  if (value === 'paid') {
    return 'Pago'
  } else if (value === 'pending' && new Date(date) < today) {
    return 'Vencida'
  } else if (value === 'pending') {
    return 'Pendente'
  } else if (value === 'overdue') {
    return 'Vencida'
  }
}