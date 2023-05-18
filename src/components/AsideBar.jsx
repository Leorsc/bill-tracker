import useUser from '@/hooks/useUser';
import api from '@/services/api';
import { File, Home, Users, ScrollText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function AsideBar({ page }) {
  const { setClients, setCharges } = useUser()
  const router = useRouter();

  function handleRefreshClients() {
    router.push('/clients')
    getClients()
  }

  function handleRefreshCharges() {
    router.push('/charges')
    getCharges()
  }

  async function getClients() {
    try {
      const response = await api.get('/client')
      setClients(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getCharges() {
    try {
      const response = await api.get('/charges')

      setCharges(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <aside className="fixed top-0 left-0 h-full overflow-auto w-[108px] bg-lavander-grey z-10">
      <div className='h-[366px] w-full flex flex-col mt-11 gap-12'>
        <div
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${page === 'home' ? 'border-r-2 border-pink' : ''}`}
          onClick={() => router.push('/')}
        >
          <Home
            size={36}
            stroke={`${page === 'home' ? '#DA0175' : '#343447'}`}
            strokeWidth={1.5}
          />
          <span
            className={`font-nunito font-semibold ${page === 'home' ? 'text-pink' : 'text-deep-night'}`}
          >
            Home
          </span>
        </div>
        <div
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${(page === 'clients' || page === 'client') ? 'border-r-2 border-pink' : ''}`}
          onClick={handleRefreshClients}
        >
          <Users
            size={36}
            stroke={`${page === 'clients' || page === 'client' ? '#DA0175' : '#343447'}`}
            strokeWidth={1.5}
          />
          <span
            className={`font-nunito font-semibold ${page === 'clients' || page === 'client' ? 'text-pink' : 'text-deep-night'}`}
          >
            Clientes
          </span>
        </div>
        <div
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${page === 'charges' ? 'border-r-2 border-pink' : ''}`}
          onClick={handleRefreshCharges}
        >
          <File
            size={36}
            stroke={`${page === 'charges' ? '#DA0175' : '#343447'}`}
            strokeWidth={1.5}
          />
          <span
            className={`font-nunito font-semibold ${page === 'charges' ? 'text-pink' : 'text-deep-night'}`}
          >
            Cobranças
          </span>
        </div>
        <div
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${page === 'report' ? 'border-r-2 border-pink' : ''}`}
          onClick={() => router.push('/report')}
        >
          <ScrollText
            size={36}
            stroke={`${page === 'report' ? '#DA0175' : '#343447'}`}
            strokeWidth={1.5}
          />
          <span
            className={`font-nunito font-semibold ${page === 'report' ? 'text-pink' : 'text-deep-night'}`}
          >
            Relatório
          </span>
        </div>
      </div>
      <Image className='absolute left-1/2 translate-x-[-50%] bottom-8' src='/images/bill-tracker-logo.png' width={80} height={32} alt='logo' />
    </aside>
  );
}