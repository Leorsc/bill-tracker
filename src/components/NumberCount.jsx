export default function NumberCount({ type, values }) {

  if (type === 'paid' || type === 'in-day') {
    return (
      <span
        className='text-center w-[52px] rounded-lg font-bold text-base bg-paid text-paid-text'
      >
        {values?.length < 10 ? `0${values?.length}` : values?.length}
      </span>
    )
  }

  if (type === 'pending') {
    return (
      <span
        className='text-center w-[52px] rounded-lg font-bold text-base bg-pending text-pending-text'
      >
        {values?.length < 10 ? `0${values?.length}` : values?.length}
      </span>
    )
  }

  if (type === 'overdue' || type === 'defaulter') {
    return (
      <span
        className='text-center w-[52px] rounded-lg font-bold text-base bg-overdue text-overdue-text'
      >
        {values?.length < 10 ? `0${values?.length}` : values?.length}
      </span>
    )
  }
}