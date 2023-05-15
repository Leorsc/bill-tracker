import handleValueFormat from '@/functions/formatValue';
import handleSelectType from '@/functions/selectType';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';

import NumberCount from '../NumberCount';
import SpanNameClient from '../spans/SpanNameClient';
import SpanSeeAll from '../spans/SpanSeeAll';

export default function TablePaymentStatus({ type, values }) {
  const [tableData, setTableData] = useState([]);
  const { setOpenModalDetailsCharge, setChargeDetails } = useUser()

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

  function handleOpenModalDetailsCharge(detailsCharge) {
    setOpenModalDetailsCharge(true)
    setChargeDetails(detailsCharge)
  }

  return (
    <div className='flex flex-col items-center justify-between w-full rounded-4xl bg-white drop-shadow-home-tables'>
      <div
        className='flex items-center justify-center w-full h-[58px] py-[18px] px-6 font-montserrat font-semibold text-lg capitalize text-dark-slate-grey border-b border-morning-breeze'
      >
        <span className='text-center w-4/5'>{`Cobranças ${handleSelectType(type)}`}</span>
        <NumberCount values={values} type={type} />
      </div>
      <div className='flex items-center justify-between w-full h-[60px] px-6 font-nunito font-bold text-base text-dark-slate-grey border-b border-morning-breeze'>
        <span className='flex items-center justify-start w-[125px] h-full capitalize'>Cliente</span>
        <span className='flex items-center justify-start w-[100px] h-full'>ID da cob.</span>
        <span className='flex items-center justify-start w-[100px] h-full'>Valor</span>
      </div>
      <div className='flex flex-col justify-between w-full h-[216px] font-nunito text-sm text-span-table'>
        {tableData.map((item, index) => (
          <div className='flex justify-between w-full h-14 px-[25px] border-b border-morning-breeze' key={index}>
            <SpanNameClient path={`/client/${item.client_id}`} name={item.client_name} width={'125px'} />
            <span
              className='flex items-center justify-start w-[100px] h-full cursor-pointer'
              onClick={() => handleOpenModalDetailsCharge(item)}
            >
              {item.id || ""}
            </span>
            <span className='flex items-center justify-start w-[120px] h-full'>{item.value ? handleValueFormat(item.value) : ''}</span>
          </div>
        ))}
      </div>
      <SpanSeeAll path={`/charges?filter=${type}`} />
    </div>
  );
}