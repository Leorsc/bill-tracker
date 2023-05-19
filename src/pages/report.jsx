import LabelForm from '@/components/LabelForm';
import ButtonForm from '@/components/buttons/ButtonForm';
import SubTitlePage from '@/components/subtitles/SubTitlePage';
import handleDateFormatSimple from '@/functions/formatDateSimple';
import handleValueFormat from '@/functions/formatValue';
import generatorPDF from '@/functions/PDF/page_repor/generatorPDFR';
import api from '@/services/api';
import { reportValidationSchema } from '@/utils/yupValidations/reportValidation';
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from 'js-cookie';
import { Download, ScrollText } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonDownload from '@/components/buttons/ButtonDownload';

export default function Clients() {
  const router = useRouter()
  const [domLoaded, setDomLoaded] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reportValidationSchema),
  })
  const [clients, setClients] = useState()
  const [clientsWithCharges, setClientsWithCharges] = useState([]);
  const [geralTotalOverdue, setGeralTotalOverdue] = useState(0)
  const [dates, setDates] = useState({})

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (!token) {
      router.push('/login')
    } else {
      setDomLoaded(true);
      getClients()
    }
  }, [])

  async function getClients() {
    try {
      const response = await api.get('/client?filter=defaulter')
      setClients(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  function formatDate(dateString) {
    const parts = dateString.split('/');
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    return `${year}-${month}-${day}`
  }

  async function onSubmit(data) {
    setDates({
      date_initial: handleDateFormatSimple(data.date_initial),
      date_final: handleDateFormatSimple(data.date_final)
    })

    const startDate = new Date(formatDate(data.date_initial));
    const endDate = new Date(formatDate(data.date_final));
    let geralTotalOverdue = 0;

    const filteredClients = clients.map(client => {
      const totalCharges = client.charges.reduce((sum, charge) => {
        const dueDate = new Date(charge.due_date);
        const isInRange = dueDate >= startDate && dueDate <= endDate;
        const isPendingOrOverdue = charge.status === 'pending' || charge.status === 'overdue';

        if (isInRange && isPendingOrOverdue) {
          return sum + charge.value;
        }

        return sum;
      }, 0);


      const overdueCharges = client.charges.filter(charge => {
        const dueDate = new Date(charge.due_date);
        const isOverdue = charge.status === 'overdue';
        return dueDate <= new Date() && isOverdue;
      });

      const pendingCharges = client.charges.filter(charge => charge.status === 'pending');
      const totalPending = pendingCharges.reduce((sum, charge) => sum + charge.value, 0);

      const daysLate = overdueCharges.reduce((sum, charge) => {
        const dueDate = new Date(charge.due_date);
        const daysDiff = Math.ceil((new Date() - dueDate) / (1000 * 60 * 60 * 24));
        return sum + daysDiff;
      }, 0);

      geralTotalOverdue += totalCharges;
      return {
        ...client,
        totalCharges,
        daysLate,
        totalPending
      };
    }).filter(client => client.totalCharges > 0);

    setClientsWithCharges(filteredClients);
    setGeralTotalOverdue(geralTotalOverdue)
  }

  return (
    <>
      <Head>
        <title>BillTracker - Relatório</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='flex h-12 pl-[108px] pr-[114px] mt-6 w-full'>
            <div className='flex items-center justify-between w-full h-full'>
              <SubTitlePage title={'Relatório de Inadimplência'} icon={<ScrollText size={28} stroke="#3F3F55" />} />
              {clientsWithCharges.length ?
                <ButtonDownload
                  icon={<Download size={18} />}
                  onClick={() => generatorPDF(clientsWithCharges, dates, geralTotalOverdue)}
                >
                  Exportar
                </ButtonDownload>
                :
                ''
              }

              <form className='flex items-center gap-4 w-auto' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex items-center justify-between gap-2 w-auto'>
                  <LabelForm priority={false} title={'Data Inicial:'} />
                  <input
                    type='date'
                    className={`w-[150px] cursor-pointer text-center font-inter text-base text-input-form rounded-lg border border-solid ${errors.date_final ? 'border-error-message' : ' border-border-input'}`}
                    {...register('date_initial')}
                  />
                </div>
                <div className='flex items-center justify-between gap-3 w-auto'>
                  <LabelForm priority={false} title={'Data Final:'} />
                  <input
                    type='date'
                    className={`w-[150px] cursor-pointer text-center font-inter text-base text-input-form rounded-lg border border-solid ${errors.date_final ? 'border-error-message' : ' border-border-input'}`}
                    {...register('date_final')}
                  />
                </div>
                <ButtonForm style={{ width: '100px' }}>
                  Aplicar
                </ButtonForm>
              </form>
            </div>
          </div>
          <div className='mt-6 min-h-[642px] pr-[112px] pb-[5px] pl-[104px] w-full'>
            <div className='w-auto'>
              <h2>Cobranças dos clients</h2>
              <h1>Geral devedor :{handleValueFormat(geralTotalOverdue)}</h1>
              <div className='flex flex-wrap gap-2 w-auto'>
                {clientsWithCharges.map(client => (
                  <div className='flex flex-col border border-red-500 w-auto' key={client.id}>
                    <strong>{client.name}</strong>
                    <span>Total da divida do client: {handleValueFormat(client.totalCharges)}</span>
                    <span>Dias em atraso: {client.daysLate}</span>
                    <span>Valor de cobranças pendentes: {handleValueFormat(client.totalPending)}</span>
                    <span>Quantidade de cobranças: {client.charges.length}</span>
                    <span>Porcentagem devedor: {`${(client.totalCharges * 100 / geralTotalOverdue).toFixed(2)}%`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}