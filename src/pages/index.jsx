import ModalDetailsCharge from '@/components/modals/ModalDetailsCharge';
import PaymentStatus from '@/components/PaymentStatus';
import TableClientsStatus from '@/components/tables/TableClientsStatus';
import useUser from '@/hooks/useUser';
import api from '@/services/api';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter()
  const { openModalDetailsCharge } = useUser()
  const [chargesOverdue, setChargesOverdue] = useState('')
  const [chargesPaid, setChargesPaid] = useState('')
  const [chargesPending, setChargesPending] = useState('')
  const [defaulterTrue, setDefaulterTrue] = useState('')
  const [defaulterFalse, setDefaulterFalse] = useState('')
  const [chargesOverdueValueTotal, setChargesOverdueValueTotal] = useState(0);
  const [chargesPaidValueTotal, setChargesPaidValueTotal] = useState(0);
  const [chargesPendingValueTotal, setChargesPendingValueTotal] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (!token) {
      router.push('/login')
    } else {
      setDomLoaded(true);
    }
    getInfos()
  }, [])

  async function getInfos() {
    try {
      const [data_charges, data_clients] = await Promise.all([
        api.get('/charges/status'),
        api.get('/client/status')
      ])

      setChargesOverdue(data_charges.data.overdue)
      setChargesPaid(data_charges.data.paid)
      setChargesPending(data_charges.data.pending)
      setDefaulterFalse(data_clients.data.defaulterFalse)
      setDefaulterTrue(data_clients.data.defaulterTrue)
      setChargesOverdueValueTotal(data_charges.data.overdueValue)
      setChargesPaidValueTotal(data_charges.data.paidValue)
      setChargesPendingValueTotal(data_charges.data.pendingValue)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>{`${domLoaded ? 'BillTracker - Home' : 'Loading...'}`}</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='flex gap-[2.8%] pt-[19px] pr-[108px] pb-[0px] pl-[80px] w-full'>
            {chargesPaid && <PaymentStatus type={'paid'} values={chargesPaid} total={chargesPaidValueTotal} />}
            {chargesOverdue && <PaymentStatus type={'overdue'} values={chargesOverdue} total={chargesOverdueValueTotal} />}
            {chargesPending && <PaymentStatus type={'pending'} values={chargesPending} total={chargesPendingValueTotal} />}
          </div>
          <div className='flex gap-[2.8%] pt-[19px] pr-[108px] pb-[0px] pl-[80px] w-full mt-8'>
            {defaulterTrue && <TableClientsStatus type={'defaulter'} values={defaulterTrue} />}
            {defaulterFalse && <TableClientsStatus type={'in-day'} values={defaulterFalse} />}
          </div>
          {
            openModalDetailsCharge ?
              <div className='fixed top-0 bottom-0 left-0 right-0 bg-modal backdrop-blur-xs flex items-center justify-center z-[3]'>
                <ModalDetailsCharge />
              </div>
              :
              ''
          }
        </>
      }
    </>
  )
}
