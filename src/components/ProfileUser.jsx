import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useUser from '@/hooks/useUser';
import ModalProfileUser from './modals/ModalProfileUser';

export default function ProfileUser() {
  const { user, openModalProfileUser, setOpenModalProfileUser } = useUser()
  const [firstName, setFirtsName] = useState('')
  const [initials, setInitials] = useState('')

  function getInitials(fullName) {
    const words = fullName?.split(' ');
    const firstTwoNames = words.slice(0, 2);
    setFirtsName(firstTwoNames[0])
    const initials = firstTwoNames.map(name => name.charAt(0));
    const initialsName = initials.join('').toUpperCase();
    setInitials(initialsName)
  }

  function handleOpenModalProfileUser() {
    setOpenModalProfileUser(!openModalProfileUser)
  }

  useEffect(() => {
    if (user) {
      getInitials(user?.name)
    }
  }, [user])

  return (
    <div className="absolute right-[115.34px] top-0 flex items-center gap-4 w-auto h-12 z-[1] font-nunito font-semibold text-dark-green">
      <div className='flex items-center justify-center w-12 h-12 bg-light-greyish rounded-full text-[22px]'>{initials}</div>
      <div className='w-auto h-6 flex items-center'>
        <span className='text-lg capitalize'>{firstName}</span>
        <div className='relative'>
          <ChevronDown
            className='ml-2 cursor-pointer'
            size={28}
            stroke='#0E8750'
            onClick={handleOpenModalProfileUser}
          />
          {openModalProfileUser ? <ModalProfileUser /> : ''}
        </div>
      </div>
    </div>
  );
}

