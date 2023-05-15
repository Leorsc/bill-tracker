import useUser from '@/hooks/useUser';
import { useEffect } from 'react';
import TitlePage from './titles/TitlePage';
import ProfileUser from './ProfileUser';
import api from '@/services/api';
import ModalEditProfileUser from './modals/ModalEditProfileUser';

export default function Header({ page }) {
  const { setUser, openModalEditUser } = useUser()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    try {
      const response = await api.get('/user')
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='w-full h-[72px] flex items-center border-b border-[#ACD9C5] relative'>
      <TitlePage page={page} />
      <ProfileUser />
      {
        openModalEditUser ?
          <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
            <ModalEditProfileUser />
          </div>
          :
          ''
      }
    </header>

  );
}

