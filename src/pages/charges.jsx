import ModalDeleteCharge from '@/components/modals/ModalDeleteCharge';
import ModalDetailsCharge from '@/components/modals/ModalDetailsCharge';
import ModalEditCharge from '@/components/modals/ModalEditCharge';
import SubTitlePage from '@/components/subtitles/SubTitlePage';
import TableCharges from '@/components/tables/TableCharges';
import useUser from '@/hooks/useUser';
import api from '@/services/api';
import Cookies from 'js-cookie';
import { SlidersHorizontal, Users } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Clients() {
  const router = useRouter()

  const {
    openModalEditCharge,
    openModalDetailsCharge,
    openModalDeleteCharge,
    openNotificationWindowError,
    openNotificationWindow,
    charges,
    setCharges } = useUser()

  const { search } = (window.location);
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    getCharges()
    setDomLoaded(true);
  }, [openNotificationWindowError, openNotificationWindow])

  async function getCharges() {
    try {
      const response = await api.get(`/charges${search}`)

      setCharges(response.data)

    } catch (error) {

    }
  }

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (!token) {
      router.push('/login')
    } else {
      setDomLoaded(true);
      getCharges()
    }
  }, [])

  return (
    <>
      <Head>
        <title>BillTracker - Clientes</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='flex h-12 pl-[108px] pr-[100px] mt-6 w-full'>
            <div className='flex items-center justify-between w-full h-full pr-[320px]'>
              <SubTitlePage title={'Cobranças'} icon={<Users size={28} stroke="#3F3F55" />} />
              <div className='flex items-center justify-center h-10 w-10 bg-white cursor-pointer rounded-ten active:scale-105'>
                <SlidersHorizontal size={28} stroke="#DA0175" />
              </div>
            </div>
          </div>
          <div className='mt-6 min-h-[642px] pr-[100px] pb-[50px] pl-[104px] w-full'>
            {
              charges?.length ?
                <TableCharges charges={charges} />
                :
                ''
            }
          </div>
          {
            openModalEditCharge || openModalDetailsCharge || openModalDeleteCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                {openModalEditCharge && <ModalEditCharge />}
                {openModalDetailsCharge && <ModalDetailsCharge />}
                {openModalDeleteCharge && <ModalDeleteCharge />}
              </div>
              :
              ''
          }
        </>
      }
    </>
  )
}