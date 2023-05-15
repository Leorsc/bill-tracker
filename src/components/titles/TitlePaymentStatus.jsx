import handleValueFormat from "@/functions/formatValue";
import handleSelectIconType from "@/functions/selectIconType";
import handleSelectType from "@/functions/selectType";

export default function TitlePaymentStatus({ type, total }) {


  if (type === 'overdue') {
    return (
      <div className={`flex items-center w-full h-[111px] rounded-4xl mb-[24px] py-[23px] px-[35px] bg-overdue`}>
        <div className='flex items-center justify-center gap-10 w-full'>
          {handleSelectIconType(type)}
          <div className='flex flex-col items-center w-full gap-[11px] h-[65px] font-montserrat font-bold text-lg text-dark-slate-grey'>
            <h1>{`Cobranças ${handleSelectType(type)}`}</h1>
            <h1>
              {handleValueFormat(total)}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'pending') {
    return (
      <div className={`flex items-center w-full h-[111px] rounded-4xl mb-[24px] py-[23px] px-[35px] bg-pending`}>
        <div className='flex items-center justify-center gap-10 w-full'>
          {handleSelectIconType(type)}
          <div className='flex flex-col items-center w-full gap-[11px] h-[65px] font-montserrat font-bold text-lg text-dark-slate-grey'>
            <h1>{`Cobranças ${handleSelectType(type)}`}</h1>
            <h1>
              {handleValueFormat(total)}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'paid') {
    return (
      <div className={`flex items-center w-full h-[111px] rounded-4xl mb-[24px] py-[23px] px-[35px] bg-paid`}>
        <div className='flex items-center justify-center gap-10 w-full'>
          {handleSelectIconType(type)}
          <div className='flex flex-col items-center w-full gap-[11px] h-[65px] font-montserrat font-bold text-lg text-dark-slate-grey'>
            <h1>{`Cobranças ${handleSelectType(type)}`}</h1>
            <h1>
              {handleValueFormat(total)}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

