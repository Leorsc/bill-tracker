import Link from 'next/link';
import { useEffect, useState } from 'react';
import SpanSeeAll from '../spans/SpanSeeAll';
import handleSelectType from '@/functions/selectType';
import handleNameFormat from '@/functions/formatName';
import handleTextLimiter from '@/functions/textLimiter';
import handleSelectIconType from '@/functions/selectIconType';
import NumberCount from '../NumberCount';
import SpanNameClient from '../spans/SpanNameClient';


export default function TableClientsStatus({ type, icon, values }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (values.length < 4) {
      const diff = 4 - values.length;
      const newValues = Array(diff).fill({});
      newValues.unshift(...values);
      setTableData(newValues);
    } else {
      setTableData(values.slice(0, 4));
    }
  }, [values]);

  return (
    <div className='w-[48.6%] h-[397px] rounded-4xl drop-shadow-home-tables bg-white'>
      <div className='flex items-center justify-between w-full h-[58px] py-5 px-6 font-montserrat border-b border-morning-breeze'>
        <div className='flex items-center gap-2 font-semibold text-lg text-dark-slate-grey'>
          {handleSelectIconType(type)}
          <span>{`Clientes ${handleSelectType(type)}`}</span>
        </div>
        <NumberCount values={values} type={type} />
      </div>
      <div
        className='flex  items-center justify-between w-full h-[66px] py-2 px-6 font-nunito font-bold text-base text-dark-slate-grey border-b border-morning-breeze'
      >
        <span className='flex items-center justify-start w-[150px] h-full capitalize'>Cliente</span>
        <span className='flex items-center justify-start w-[200px] h-full'>ID do clie.</span>
        <span className='flex items-center justify-start w-[150px] h-full'>CPF</span>
      </div>
      <div className='flex flex-col justify-between w-full h-[225px] font-nunito text-sm text-graphite'>
        {
          tableData.map((item, index) => (
            <div className='flex  items-center justify-between w-full h-[56px] py-2 px-6 border-b border-morning-breeze' key={index}>

              <SpanNameClient path={`/client/${item.id}`} name={item.name} width={'150px'} />
              <span className='flex items-center justify-start w-[200px] h-full'>{item.id ? handleTextLimiter(item.id, 20) : ""}</span>
              <span className='flex items-center justify-start w-[150px] h-full'>{item.cpf ? item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1 $2 $3 $4") : ""}</span>
            </div>

          ))
        }
      </div>
      <SpanSeeAll path={`/clients?filter=${type}`} />
    </div>
  );
}

