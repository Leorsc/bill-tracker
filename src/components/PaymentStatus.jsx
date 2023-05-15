import TitlePaymentStatus from "./titles/TitlePaymentStatus";
import TablePaymentStatus from "./tables/TablePaymentStatus";


export default function PaymentStatus({ type, values, total }) {
  return (
    <div className='w-[31.5%] h-[532px]'>
      <TitlePaymentStatus type={type} total={total} />
      <TablePaymentStatus type={type} values={values} />
    </div>
  );
}

