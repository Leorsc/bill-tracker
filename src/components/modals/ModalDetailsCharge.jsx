import handleDateFormat from "@/functions/formatDate";
import handleValueFormat from "@/functions/formatValue";
import useUser from "@/hooks/useUser";
import { FileText, X } from "lucide-react";
import SubTitleForm from "../subtitles/SubTitleForm";


export default function ModalDetailsCharge() {
  const { setOpenModalDetailsCharge, chargeDetails } = useUser()

  function handleSelectStatusType(value) {
    const today = new Date();

    if (value === 'paid') {
      return 'Pago'
    } else if (value === 'pending' && new Date(chargeDetails.due_date) < today) {
      return 'Vencida'
    } else if (value === 'pending') {
      return 'Pendente'
    } else if (value === 'overdue') {
      return 'Vencida'
    }
  }

  function handleCloseModal() {
    setOpenModalDetailsCharge(false)
  }

  return (
    <div className='relative bg-white w-[600px] h-auto rounded-4xl py-10 px-14'>
      <X
        className='absolute cursor-pointer top-6 right-6'
        onClick={handleCloseModal}
      />
      <div className='flex flex-col gap-4'>
        <SubTitleForm style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <FileText stroke='#3F3F55' />
          Detalhe da Cobrança
        </SubTitleForm>
        <div className='flex flex-col gap-6 font-nunito text-base'>
          <div className='flex flex-col gap-2'>
            <strong className='font-bold text-dark-slate-grey'>Nome</strong>
            <span>{chargeDetails.client_name}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <strong className='font-bold text-dark-slate-grey'>Descrição</strong>
            <span className='h-auto'>{chargeDetails.description}</span>
          </div>
          <div className='flex gap-x-[147px]'>
            <div className='flex flex-col gap-2'>
              <strong className='font-bold text-dark-slate-grey'>Vencimento</strong>
              <span>{handleDateFormat(chargeDetails.due_date)}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <strong className='font-bold text-dark-slate-grey'>Valor</strong>
              <span>{handleValueFormat(chargeDetails.value)}</span>
            </div>
          </div>
          <div className='flex gap-[147px]'>
            <div className='flex flex-col gap-2'>
              <strong className='font-bold text-dark-slate-grey'>ID cobrança</strong>
              <span>{chargeDetails.id}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <strong className='font-bold text-dark-slate-grey'>Status</strong>
              <span
                className={`px-2 font-semibold rounded-lg text-${chargeDetails.status}-text bg-${chargeDetails.status}`}
              >
                {handleSelectStatusType(chargeDetails.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
