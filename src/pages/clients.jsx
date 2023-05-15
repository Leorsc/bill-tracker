import ButtonForm from '@/components/buttons/ButtonForm';
import ModalRegisterCharge from '@/components/modals/ModalRegisterCharge';
import SubTitlePage from '@/components/subtitles/SubTitlePage';
import TableClients from '@/components/tables/TableClients';
import useUser from '@/hooks/useUser';
import api from '@/services/api';
import Cookies from 'js-cookie';
import { SlidersHorizontal, Users } from 'lucide-react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import ModalRegisterCharge from '../../components/ModalRegisterCharge';
// import ModalRegisterClient from '../../components/ModalRegisterClient';


export default function Clients() {
  const router = useRouter()
  const { clients,
    setClients,
    openModalRegisterClient,
    setOpenModalRegisterClient,
    openModalRegisterCharge,
    openNotificationWindow,
    refreshClients } = useUser()

  const { search } = (window.location);
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (!token) {
      router.push('/login')
    } else {
      setDomLoaded(true);
    }
    getClients()
  }, [])

  useEffect(() => {
    getClients()
    setDomLoaded(true);
  }, [refreshClients, openNotificationWindow])


  async function getClients() {
    try {
      const response = await api.get(`/client${search}`)
      setClients(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleRegisterClient() {
    if (openNotificationWindow) {
      return
    }
    setOpenModalRegisterClient(true)
  }

  return (
    <>
      <Head>
        <title>BillTracker - Clientes</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='flex h-12 pl-[108px] pr-[114px] mt-6 w-full'>
            <div className='flex items-center justify-between w-full h-full'>
              <SubTitlePage title={'Clientes'} icon={<Users size={28} stroke="#3F3F55" />} />
              <div className='flex items-center justify-between w-[632px] pr-[310px] h-full'>
                <ButtonForm onClick={handleRegisterClient} style={{ width: 267, height: 33 }} >
                  + Adicionar cliente
                </ButtonForm>
                <div className='flex items-center justify-center h-10 w-10 bg-white cursor-pointer rounded-[10px] active:scale-105'>
                  <SlidersHorizontal size={28} stroke="#DA0175" />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 min-h-[642px] pr-[112px] pb-[5px] pl-[104px] w-full'>
            {
              clients ?
                <TableClients clients={clients} />
                :
                ''
            }
          </div>
          {
            openModalRegisterClient ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalRegisterClient />
              </div>
              :
              ''
          }
          {
            openModalRegisterCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalRegisterCharge />
              </div>
              :
              ''
          }
        </>
      }
    </>
  )
}