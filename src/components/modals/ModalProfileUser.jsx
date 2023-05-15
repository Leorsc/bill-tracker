import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useUser from '@/hooks/useUser';
import { Edit, LogOut } from 'lucide-react';

export default function ModalProfileUser() {
  const { setOpenModalEditUser } = useUser()
  const router = useRouter()

  function getOut() {
    Cookies.remove('auth-token')
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-between  absolute top-10 w-36 h-16 px-6 rounded-lg bg-white drop-shadow-modal">
      <div className='inline-block absolute h-0 w-0 -top-[14px] left-[5px] border-l-[17px] border-r-[17px] border-b-[17px] border-l-transparent border-r-transparent border-b-white'></div>
      <div
        className='flex flex-col items-center gap-1 cursor-pointer'
        onClick={() => setOpenModalEditUser(true)}>
        <Edit size={22} stroke='#747488' />
        <span className='font-nunito font-semibold text-sm text-graphite'>Editar</span>
      </div>
      <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={getOut}>
        <LogOut size={22} stroke='#747488' />
        <span className='font-nunito font-semibold text-sm text-graphite'>Sair</span>
      </div>
    </div>
  );
}

