import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import FormInputGroup from "./FormInputGroup";
import handleDateFormat from '@/functions/formatDate';

export default function InputDataValue({ errors, register, handleSetValue, initialValueDue_Date, initialValueValue }) {
  return (
    <div className={`flex w-full gap-6 ${errors.value || errors.due_date ? 'h-[88px]' : 'h-[70px]'}`}>
      <FormInputGroup
        className='flex flex-col gap-1 h-full w-1/2'
        title='Vencimento'
        name={'due_date'}
        errors={errors.due_date}
        priority={true}
      >
        <InputMask
          className="w-full font-inter text-base text-input-form"
          mask="99/99/9999"
          {...register('due_date')}
          placeholder="Data de Vencimento"
          defaultValue={initialValueDue_Date ? handleDateFormat(initialValueDue_Date) : ''}
        />
      </FormInputGroup>
      <FormInputGroup
        className='h-full w-1/2'
        title='Valor'
        name={'value'}
        errors={errors.value}
        priority={true}
      >
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          prefix="R$ "
          placeholder="Digite o valor"
          onChange={handleSetValue}
          defaultValue={initialValueValue ? initialValueValue : ''}
        />
      </FormInputGroup>
    </div>
  )
}