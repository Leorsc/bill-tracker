import useUser from "@/hooks/useUser";
import SpanData from "../spans/SpanData";
import { Edit3 } from "lucide-react";

export default function ContainerInfoClientID({ clientDetailsPage }) {
  const { setOpenModalEditClient, openNotificationWindow, openNotificationWindowError } = useUser()

  function handleEditClient() {
    if (openNotificationWindow || openNotificationWindowError) {
      return
    }
    setOpenModalEditClient(true)
  }

  return (
    <div className='flex flex-col gap-[18px] w-full h-full'>
      <section
        className='flex items-center justify-between h-[15.87%]'
      >
        <span className='font-montserrat text-lg font-bold text-dark-slate-grey'>Dados do cliente</span>
        <button
          className='flex 
                    items-center 
                    justify-center 
                    gap-1
                    w-[248px] h-[35px] 
                    border-light-greyish 
                    border border-solid 
                    bg-light-greyish-white 
                    rounded-ten 
                    text-dark-green 
                    font-nunito 
                    text-lg 
                    cursor-pointer'
          onClick={handleEditClient}
        >
          <Edit3 size={18} />
          Editar Cliente
        </button>
      </section>
      <section
        className='flex align-start justify-between flex-col w-full h-[84.13%]'
      >
        <div className='flex w-3/5'>
          <div className="w-1/2">
            <SpanData title={'E-mail'} info={clientDetailsPage?.email} />
          </div>
          <div className="w-[30%]">
            <SpanData title={'Telefone'} info={clientDetailsPage?.phone?.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")} />
          </div>
          <div className="w-[30%]">
            <SpanData title={'CPF'} info={clientDetailsPage?.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")} />
          </div>
        </div>
        <div className='flex justify-between w-full'>
          <SpanData title={'Endereço'} info={clientDetailsPage?.street} />
          <SpanData title={'Bairro'} info={clientDetailsPage?.neighborhood} />
          <SpanData title={'Complemento'} info={clientDetailsPage?.complement} />
          <SpanData title={'CEP'} info={clientDetailsPage?.zip_code?.replace(/(\d{5})(\d{3})/, "$1-$2")} />
          <SpanData title={'Cidade'} info={clientDetailsPage?.city} />
          <SpanData title={'UF'} info={clientDetailsPage?.state} />
        </div>
      </section>
    </div>
  );
}

