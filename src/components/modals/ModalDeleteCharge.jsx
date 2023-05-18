import useUser from '@/hooks/useUser';
import api from '@/services/api';
import { AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ModalDeleteCharge() {
  const {
    setOpenModalDeleteCharge,
    deleteCharge,
    setDeleteCharge,
    setOpenNotificationWindowError,
    setTextNotification,
    setOpenNotificationWindow,
    setTypeNotification } = useUser()

  function handleCloseModal() {
    setOpenModalDeleteCharge(false)
    setDeleteCharge('')
  }

  async function handleDeleteCharge() {
    try {
      await api.delete(`/charges/${deleteCharge.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  function handleValidateDelete() {
    if (deleteCharge.status === 'pending') {
      handleDeleteCharge()
      handleCloseModal()
      setTimeout(() => {
        setTextNotification('Cobrança excluída com sucesso!')
        setOpenNotificationWindow(true)
        setTypeNotification('accept')
      }, 1000)

    } else {
      handleCloseModal()
      setTimeout(() => {
        setOpenNotificationWindowError(true)
        setTextNotification('Esta cobrança não pode ser excluída!')
        setTypeNotification('not-delete')
      }, 1000)

    }
  }

  return (
    <div className='relative bg-white w-[600px] h-auto rounded-4xl py-14 px-18'>
      <X
        className='absolute cursor-pointer top-6 right-6'
        onClick={handleCloseModal}
      />
      <div className='flex flex-col items-center justify-between gap-6'>
        <div className='flex flex-col items-center gap-11'>
          <AlertTriangle stroke="#CC7800" strokeWidth={1.5} size={136} />
          <h2 className='font-montserrat font-semibold text-lg text-[#CC7800]'>Tem certeza que deseja excluir esta cobrança?</h2>
        </div>
        <div className='flex gap-4 font-nunito text-lg font-semibold'>
          <button
            className='w-24 h-6 rounded text-center cursor-pointer bg-[#F2D6D0] text-red-2'
            onClick={handleCloseModal}
          >
            Não
          </button>
          <button
            className='w-24 h-6 rounded text-center cursor-pointer bg-[#ACD9C5] text-[#034A2A]'
            onClick={handleValidateDelete}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
