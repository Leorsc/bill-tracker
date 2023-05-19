import { format } from "date-fns";

export default function generetorDateNameFile() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd/MM/yyyy');
  const parts = formattedDate.split('/');
  return `${parts[0]}_${parts[1]}_${parts[2]}`;
}
