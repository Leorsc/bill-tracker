import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import AsideBar from '@/components/AsideBar';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Layout({ children, page }) {
  const {
    openModalEditUser,
    setOpenModalEditUser,
    openModalRegisterClient,
    setOpenModalRegisterClient,
    setOpenModalProfileUser } = useUser()
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setOpenModalEditUser(false)
    setOpenModalRegisterClient(false)
    setOpenModalProfileUser(false)
    setDomLoaded(true);
  }, [])

  return (
    <>
      {
        page === 'register' || page === 'login' || page === 'forgot' || page === 'reset-password' ?
          <main className='h-screen flex items-center relative'>
            <Image className='absolute top-4 right-4' src='/images/bill-tracker-logo-white-removebg.png' width={100} height={100} alt='logo' />
            {children}
          </main>
          :
          <>
            {
              domLoaded &&
              <main className={`w-full min-h-screen flex overflow-hidden ${openModalEditUser || openModalRegisterClient ? 'fixed overflow-y-hidden' : ''}`}>
                <div className={`bg-lavander-grey min-h-[894px] w-[108px] ${openModalEditUser || openModalRegisterClient ? 'z-10' : ''}`}>
                  <AsideBar page={page} />
                </div>
                <div className='flex flex-col w-full min-h-[894px] pt-10 pb-20 px-[30px] bg-light-greyish-white'>
                  <Header page={page} />
                  {children}
                </div>
              </main>
            }
          </>
      }
    </>
  );
}
