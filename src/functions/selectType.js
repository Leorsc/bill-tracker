export default function handleSelectType(value) {
  if (value === 'paid') {
    return 'Pagas'
  } else if (value === 'pending') {
    return 'Previstas'
  } else if (value === 'overdue') {
    return 'Vencidas'
  } else if (value === 'defaulter') {
    return 'Inadimplentes'
  } else if (value === 'in-day') {
    return 'em dia'
  }
}