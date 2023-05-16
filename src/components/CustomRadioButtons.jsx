import { Check } from "lucide-react";
import LabelForm from "./LabelForm";

export default function CustomRadioButtons({ handleOptionClick, selectedOption, register }) {
  return (
    <div className="flex flex-col gap-4">
      <LabelForm htmlFor={'status'} title={'Status'} priority={true} />
      <div className='flex flex-col gap-2'>
        <div
          className='flex items-center gap-2 w-full h-12 py-3 px-4 rounded-ten bg-lavander-grey cursor-pointer'
          onClick={() => handleOptionClick('paid')}
        >
          <div className={`flex items-center justify-center w-6 h-6 rounded-full ${selectedOption === 'paid' ? 'bg-dark-green' : 'bg-[#C8C8D7]'}`}>
            {
              selectedOption === 'paid' ?
                <Check size={16} stroke="white" /> : ''
            }
          </div>
          <div className="font-nunito text-base text-dark-slate-grey">Cobrança Paga</div>
        </div>
        <div
          className='flex items-center gap-2 w-full h-12 py-3 px-4 rounded-ten bg-lavander-grey cursor-pointer'
          onClick={() => handleOptionClick('pending')}
        >
          <div className={`flex items-center justify-center w-6 h-6 rounded-full ${selectedOption === 'pending' ? 'bg-dark-green' : 'bg-[#C8C8D7]'}`}>
            {
              selectedOption === 'pending' ?
                <Check size={16} stroke="white" /> : ''
            }
          </div>
          <div className="font-nunito text-base text-dark-slate-grey">Cobrança Pendete</div>
        </div>
        <input type="hidden"  {...register('status')} />
      </div>
    </div>

  );
}

