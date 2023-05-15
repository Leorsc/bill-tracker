import { FileCheck, FileWarning, FileX, UserCheck, UserX } from "lucide-react"

export default function handleSelectIconType(value) {
  if (value === 'paid') {
    return <FileCheck size={64} stroke="#1FA7AF" strokeWidth={1} />
  } else if (value === 'pending') {
    return <FileWarning size={64} stroke="#C5A605" strokeWidth={1} />
  } else if (value === 'overdue') {
    return <FileX size={64} stroke="#971D1D" strokeWidth={1} />
  } else if (value === 'defaulter') {
    return <UserX size={24} stroke="#971D1D" strokeWidth={1} />
  } else if (value === 'in-day') {
    return <UserCheck size={24} stroke="#1FA7AF" strokeWidth={1} />
  }
}