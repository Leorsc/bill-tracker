export default function HorizontalStepper({ formStep, setFormStep }) {
  return (
    <div className="flex items-center justify-center gap-2 absolute bottom-16">
      <div onClick={() => setFormStep(0)} className={`w-20 h-[6px] rounded-[20px] cursor-pointer ${formStep === 0 ? 'bg-dark-green' : 'bg-light-greyish'}`} ></div>
      <div className={`w-20 h-[6px] rounded-[20px] ${formStep === 1 ? 'bg-dark-green' : 'bg-light-greyish'}`} ></div>
      <div className={`w-20 h-[6px] rounded-[20px] ${formStep === 2 ? 'bg-dark-green' : 'bg-light-greyish'}`} ></div>
    </div>
  );
}