import LoadingProgress from '@/components/LoadingProgress';
import ButtonForm from '@/components/buttons/ButtonForm';
import ContainerInfoClientID from '@/components/containers/ContainerInfoClientID';
import IconDeleteChange from '@/components/icons/IconDeleteCharge';
import IconEditChange from '@/components/icons/IconEditCharge';
import ModalDeleteCharge from '@/components/modals/ModalDeleteCharge';
import ModalDetailsCharge from '@/components/modals/ModalDetailsCharge';
import ModalEditCharge from '@/components/modals/ModalEditCharge';
import ModalEditClient from '@/components/modals/ModalEditClient';
import ModalRegisterCharge from '@/components/modals/ModalRegisterCharge';
import SubTitlePage from '@/components/subtitles/SubTitlePage';
import useUser from '@/hooks/useUser';
import api from '@/services/api';
import { Users } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Client_Details() {
  const router = useRouter()
  const {
    user,
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
    textNotification
  } = useUser()

  const [clientDetailsPage, setClientDetailsPage] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [chargesClient, setChangesClient] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    getClients()
    setDomLoaded(true);
  }, [])

  useEffect(() => {
    if (!isLoading && chargesClient?.length < 1) {
      setOpenNotificationWindowError(true)
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
    const { id } = router.query;
    try {
      const response = await api.get(`/client/${id}`)
      setClientDetailsPage(response.data)
      setChangesClient(response.data.charges)

      setTimeout(() => {
        setIsLoading(false);
      }, 2600)

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
            {clientDetailsPage?.name && <SubTitlePage title={clientDetailsPage?.name} icon={<Users stroke='#3F3F55' />} />}
            <div className='h-[268.5px] py-[24px] px-[32px] w-full rounded-4xl bg-white '>
              {
                clientDetailsPage ?
                  <ContainerInfoClientID clientDetailsPage={clientDetailsPage} />
                  :
                  ''
              }
            </div>
            <div className=' w-full rounded-4xl bg-white h-auto'>
              <div className='pr-[22px] pl-[24px] flex items-center justify-between w-full'>
                <span className='font-montserrat font-bold text-lg text-dark-slate-grey'>Cobranças do Cliente</span>
                <ButtonForm onClick={handleCreateChangeClient} style={{ width: 252, height: 33 }} >
                  + Nova cobrança
                </ButtonForm>
              </div>
              {
                isLoading ?
                  // <div className='table_clientID'>
                  //   <div className='display_2
                  //               width_100
                  //               font_16
                  //               font_bold
                  //               font_nunito
                  //               color_dark_slate_grey'
                  //     style={{ height: 58, marginBottom: 8 }}
                  //   >
                  //     <div className='display_2 height_100 width_100'>
                  //       <div className='table_clientID_header_id'>
                  //         <img src={arrowDownUp} alt='seta para cima e para baixo' />
                  //         ID Cob.
                  //       </div>
                  //       <div className='table_clientID_header_data_vencimento'>
                  //         <img src={arrowDownUp} alt='seta para cima e para baixo' />
                  //         Data de venc.
                  //       </div>
                  //       <div className='table_clientID_header_valor'>
                  //         Valor
                  //       </div>
                  //       <div className='table_clientID_header_status'>
                  //         Status
                  //       </div>
                  //       <div className='table_clientID_header_descricao'>
                  //         Descrição
                  //       </div>
                  //       <div className='table_clientID_header_icons'>
                  //       </div>
                  //     </div>
                  //   </div>
                  <div className='no_charges_clientID display_1 width_100'>
                    <LoadingProgress />
                  </div>
                  // </div>
                  :
                  <>
                    <div className='flex items-center justify-center gap-2 h-14'>
                      <IconDeleteChange />
                      <IconEditChange />
                    </div>
                    {/* {
                      (chargesClient?.length || !chargesClient) ?
                        <TableClientIDCharges chargesClient={chargesClient} clientName={clientDetailsPage.name} />
                        :
                        <>
                          <div className='table_clientID'>
                            <div className='display_2
                                        width_100
                                        font_16
                                        font_bold
                                        font_nunito
                                        color_dark_slate_grey'
                              style={{ height: 58, marginBottom: 8 }}
                            >
                              <div className='display_2 height_100 width_100'>
                                <div className='table_clientID_header_id'>
                                  <img src={arrowDownUp} alt='seta para cima e para baixo' />
                                  ID Cob.
                                </div>
                                <div className='table_clientID_header_data_vencimento'>
                                  <img src={arrowDownUp} alt='seta para cima e para baixo' />
                                  Data de venc.
                                </div>
                                <div className='table_clientID_header_valor'>
                                  Valor
                                </div>
                                <div className='table_clientID_header_status'>
                                  Status
                                </div>
                                <div className='table_clientID_header_descricao'>
                                  Descrição
                                </div>
                                <div className='table_clientID_header_icons'>
                                </div>
                              </div>
                            </div>
                            <div className='no_charges_clientID'>
                            </div>
                          </div>
                          {openNotificationWindowError ?
                            <NotificationWindowError type={false} style={{ gap: 11 }} >
                              {'Não possui cobranças cadastradas!'}
                            </NotificationWindowError>
                            :
                            ''
                          }
                          {
                            openNotificationWindow ?
                              <NotificationWindow style={{ gap: 11 }} >
                                {textNotification}
                              </NotificationWindow>
                              :
                              ""
                          } */}
                    {/* </>
                    } */}
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
          {/* {
            openModalRegisterCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalRegisterCharge />
              </div>
              :
              ''
          }

          {
            openModalEditCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalEditCharge />
              </div>
              :
              ''
          }
          {
            openModalDetailsCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalDetailsCharge />
              </div>
              :
              ''
          }
          {
            openModalDeleteCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalDeleteCharge />
              </div>
              :
              ''
          } */}
        </>
      }
    </>
  )
}