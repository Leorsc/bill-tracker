import ButtonForm from "./ButtonForm";

export default function ButtonsCancelApply({ ...props }) {
  return (
    <div className="flex items-center justify-between w-full gap-6">
      <button
        className='w-1/2 h-[33px] border border-light-greyish border-solid text-center bg-light-greyish-white text-dark-green rounded-ten font-nunito text-lg cursor-pointer'
        type='button'
        {...props}
      >
        Cancelar
      </button>
      <ButtonForm style={{ width: '50%', height: 33 }}>
        Aplicar
      </ButtonForm>
    </div>
  );
}