import LoadingProgress from '@/components/LoadingProgress';
import NotificationWindow from '@/components/NotificationWindow';
import ButtonForm from '@/components/buttons/ButtonForm';
import ContainerInfoClientID from '@/components/containers/ContainerInfoClientID';
import CustomHeaderTableCLientID from '@/components/customs/CustomHeaderTableClientID';
import ModalDeleteCharge from '@/components/modals/ModalDeleteCharge';
import ModalDetailsCharge from '@/components/modals/ModalDetailsCharge';
import ModalEditCharge from '@/components/modals/ModalEditCharge';
import ModalEditClient from '@/components/modals/ModalEditClient';
import ModalRegisterCharge from '@/components/modals/ModalRegisterCharge';
import SubTitlePage from '@/components/subtitles/SubTitlePage';
import TableClientID from '@/components/tables/TableClientID';
import useUser from '@/hooks/useUser';
import api from '@/services/api';
import Cookies from 'js-cookie';
import { Users } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Client_Details() {
  const {
    openModalEditClient,
    setClientCreateChange,
    openNotificationWindow,
    openModalRegisterCharge,
    setOpenModalRegisterCharge,
    openNotificationWindowError,
    setOpenNotificationWindowError,
    openModalEditCharge,
    openModalDetailsCharge,
    openModalDeleteCharge,
    textNotification,
    setTextNotification,
    typeNotification,
    setTypeNotification
  } = useUser()

  const [clientDetailsPage, setClientDetailsPage] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [chargesClient, setChangesClient] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    getClients()
  }, [])

  useEffect(() => {
    if (!isLoading && chargesClient?.length < 1) {
      setOpenNotificationWindowError(true)
      setTypeNotification('not-delete')
      setTextNotification('Não possui cobranças cadastradas!')
    }
  }, [isLoading])

  useEffect(() => {
    getClients()
  }, [openNotificationWindow, openNotificationWindowError])

  function handleCreateChangeClient() {
    if (openNotificationWindow || openNotificationWindowError) {
      return
    }
    setClientCreateChange(clientDetailsPage)
    setOpenModalRegisterCharge(true)
  }

  async function getClients() {
    const id = Cookies.get('client-id')
    try {
      const response = await api.get(`/client/${id}`)
      setClientDetailsPage(response.data)
      setChangesClient(response.data.charges)

      setTimeout(() => {
        setIsLoading(false);
      }, 2600)

      setDomLoaded(true);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>{`${domLoaded ? `BillTracker - ${clientDetailsPage ? clientDetailsPage?.name : '...'}` : 'Loading...'}`}</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='flex flex-col items-start gap-6 py-[28px] px-[108px] w-full h-full'>
            {clientDetailsPage?.name && <SubTitlePage title={clientDetailsPage?.name} icon={<Users size={32} strokeWidth={1.5} stroke='#3F3F55' />} />}
            <div className='h-[268.5px] py-[24px] px-[32px] w-full rounded-4xl bg-white '>
              {
                clientDetailsPage ?
                  <ContainerInfoClientID clientDetailsPage={clientDetailsPage} />
                  :
                  ''
              }
            </div>
            <div className='w-full rounded-4xl bg-white h-auto relative pt-6 px-1.5'>
              <div className='pr-[22px] pl-[24px] flex items-center justify-between w-full'>
                <span className='font-montserrat font-bold text-lg text-dark-slate-grey'>Cobranças do Cliente</span>
                <ButtonForm onClick={handleCreateChangeClient} style={{ width: 252, height: 33 }} >
                  + Nova cobrança
                </ButtonForm>
              </div>
              {
                isLoading ?
                  <CustomHeaderTableCLientID>
                    <LoadingProgress />
                  </CustomHeaderTableCLientID>
                  :
                  <>
                    {
                      (chargesClient?.length || !chargesClient) ?
                        <TableClientID chargesClient={chargesClient} clientName={clientDetailsPage.name} />
                        :
                        <>
                          <CustomHeaderTableCLientID />
                          {openNotificationWindowError ?
                            <NotificationWindow type={typeNotification} style={{ gap: 11 }} >
                              {textNotification}
                            </NotificationWindow>
                            :
                            ''
                          }
                          {
                            openNotificationWindow ?
                              <NotificationWindow type={typeNotification} style={{ gap: 11 }} >
                                {textNotification}
                              </NotificationWindow>
                              :
                              ""
                          }
                        </>
                    }
                  </>
              }
            </div>
          </div>
          {
            openModalEditClient || openModalRegisterCharge || openModalEditCharge || openModalDetailsCharge || openModalDeleteCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                {openModalEditClient && <ModalEditClient client={clientDetailsPage} />}
                {openModalRegisterCharge && <ModalRegisterCharge />}
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