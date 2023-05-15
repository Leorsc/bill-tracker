import useUser from '@/hooks/useUser';
import { Home, Users, File } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function AsideBar({ page }) {
  const { refreshClients, setRefreshClients, refreshCharges, setRefreshCharges } = useUser()
  const router = useRouter();

  function handleRefreshClients() {
    router.push('/clients')
    setRefreshClients(!refreshClients)
  }

  function handleRefreshCharges() {
    router.push('/charges')
    setRefreshCharges(!refreshCharges)
  }

  return (
    <aside className="fixed top-0 left-0 h-full overflow-auto w-[108px] bg-lavander-grey z-10">
      <div className='h-[366px] w-full flex flex-col mt-11 gap-12'>
        <div
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${page === 'home' ? 'border-r-2 border-pink' : ''}`}
          onClick={() => router.push('/')}
        >
          <Home
            size={29}
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
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${(page === 'clients' || page === 'client_details') ? 'border-r-2 border-pink' : ''}`}
          onClick={handleRefreshClients}
        >
          <Users
            size={29}
            stroke={`${page === 'clients' || page === 'client_details' ? '#DA0175' : '#343447'}`}
            strokeWidth={1.5}
          />
          <span
            className={`font-nunito font-semibold ${page === 'clients' || page === 'client_details' ? 'text-pink' : 'text-deep-night'}`}
          >
            Clientes
          </span>
        </div>
        <div
          className={`flex flex-col items-center w-full justify-center cursor-pointer gap-[13.5px] h-[74px] ${page === 'charges' ? 'border-r-2 border-pink' : ''}`}
          onClick={handleRefreshCharges}
        >
          <File
            size={29}
            stroke={`${page === 'charges' ? '#DA0175' : '#343447'}`}
            strokeWidth={1.5}
          />
          <span
            className={`font-nunito font-semibold ${page === 'charges' ? 'text-pink' : 'text-deep-night'}`}
          >
            Cobranças
          </span>
        </div>
      </div>
      <Image className='absolute bottom-8' src='/images/bill-tracker-logo5.png' width={108} height={32} alt='logo' />
    </aside>
  );
}