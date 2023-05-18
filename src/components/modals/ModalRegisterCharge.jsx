import useUser from '@/hooks/useUser';
import api from '@/services/api';
import { registerChangeValidationSchema } from '@/utils/yupValidations/registerChangeValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { File, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import LabelForm from '../LabelForm';
import ButtonsCancelApply from '../buttons/ButtonsCancelApply';
import CustomRadioButtons from '../customs/CustomRadioButtons';
import GenericInput from '../inputs/GenericInput';
import InputDataValue from '../inputs/InputDataValue';
import SpanErrorForm from '../spans/SpanErrorForm';
import SubTitleForm from '../subtitles/SubTitleForm';

export default function ModalRegisterCharge() {
  const {
    setOpenModalRegisterCharge,
    clientCreateChange,
    setTextNotification,
    setOpenNotificationWindow,
    setTypeNotification } = useUser()

  const [selectedOption, setSelectedOption] = useState('pending');
  const [apiError, setApiError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerChangeValidationSchema),
    defaultValues: {
      status: selectedOption
    }
  });

  function handleSetValue(event) {
    const valueFormated = event.target.value.replace("R$", "").trim()
    setValue('value', valueFormated)
  }

  function handleValueCents(value) {
    value = value.replace(".", "").replace(",", ".");
    value = parseFloat(value);
    value = Math.round(value * 100);
    return value;
  }

  function formatDate(dateString) {
    const parts = dateString.split('/');
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    return `${year}-${month}-${day}`
  }

  async function onSubmit(data) {
    try {
      await api.post(`/charges/${clientCreateChange.id}`,
        {
          description: data.description,
          due_date: formatDate(data.due_date),
          status: data.status,
          value: handleValueCents(data.value)
        })

      handleCloseModal()
      setTimeout(() => {
        setTextNotification('Cobrança cadastrada com sucesso')
        setOpenNotificationWindow(true)
        setTypeNotification('accept')
      }, 1000)


    } catch (error) {
      if (error.response?.data?.error === "Email already exists") {
        setApiError("Este email já está cadastrado.");
        setTimeout(() => {
          setApiError(null)
        }, 2000)
      }
      console.log(error)
    }
  };

  function handleOptionClick(optionValue) {
    setSelectedOption(optionValue);
    setValue('status', optionValue);
  }

  function handleCloseModal() {
    reset();
    setOpenModalRegisterCharge(false)
  }

  return (
    <div className='relative bg-white w-[600px] h-auto rounded-4xl pt-[51px] px-[57px] pb-[40px]'>
      <X
        className='absolute cursor-pointer top-6 right-6'
        onClick={handleCloseModal}
      />
      <form className='flex flex-col items-center justify-between w-full gap-[136px]' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5 w-full'>
          <SubTitleForm style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <File
              size={29}
              stroke='#3F3F55'
              strokeWidth={1.5}
            />
            Cadastro de Cobrança
          </SubTitleForm>
          <div className="flex flex-col w-full gap-4">
            <GenericInput
              title={'Nome'}
              name={'name'}
              errors={errors.name}
              priority={true}
              type={'text'}
              placeholder=""
              register={register}
              value={clientCreateChange.name}
              disabled
            />
            <div className={`flex flex-col items-start justify-between w-full ${errors.description ? '' : 'h-28'}`}>
              <LabelForm htmlFor={'description'} title={'Descrição'} priority={true} />
              <div className={`relative w-full h-[88px] py-2.5 px-3.5 rounded-lg ${errors.description ? 'border border-error-message' : 'border border-border-input'}`}>
                <textarea
                  className="w-full h-auto max-h-[68px] font-inter text-base text-input-form whitespace-pre-wrap break-words overflow-hidden"
                  {...register('description')}
                  placeholder="Digite a descrição"
                  rows="3"
                  maxLength='141'
                />
              </div>
              {errors.description && (
                <SpanErrorForm>{errors.description.message}</SpanErrorForm>
              )}
            </div>
            <InputDataValue
              handleSetValue={handleSetValue}
              errors={errors}
              register={register}
            />
            <CustomRadioButtons
              handleOptionClick={handleOptionClick}
              selectedOption={selectedOption}
              register={register}
            />
          </div>
        </div>
        {apiError && <SpanErrorForm>{apiError}</SpanErrorForm>}
        <ButtonsCancelApply onClick={handleCloseModal} />
      </form>
    </div>
  );
}
