import { ArrowDownUp } from "lucide-react";

export default function CustomHeaderTableCLientID({ children }) {
  return (
    <div className='w-full h-auto py-[12px] px-6'>
      <div className='flex items-center justify-between w-full text-base font-bold font-nunito text-dark-slate-grey h-[58px] mb-2'>
        <div className='flex items-center justify-between w-full h-full'>
          <div className='flex items-start gap-2 w-40'>
            <ArrowDownUp />
            ID Cob.
          </div>
          <div className='flex items-start gap-2 w-44'>
            <ArrowDownUp />
            Data de venc.
          </div>
          <div className='flex items-start w-32'>
            Valor
          </div>
          <div className='flex items-start w-32'>
            Status
          </div>
          <div className='flex items-start w-80'>
            Descrição
          </div>
          <div className=''>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center w-full h-40 relative font-montserrat font-bold text-lg text-dark-slate-grey'>
        {children}
      </div>
    </div>
  )
}