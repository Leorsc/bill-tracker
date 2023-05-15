import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import SubTitleForm from '../subtitles/SubTitleForm';
import { File, X } from 'lucide-react';
import useUser from '@/hooks/useUser';
import { registerChangeValidationSchema } from '@/utils/yupValidations/registerChangeValidation';
import ButtonsCancelApply from '../buttons/ButtonsCancelApply';

export default function ModalRegisterCharge() {
  const { setOpenModalRegisterCharge, clientCreateChange, setTextNotification, setOpenNotificationWindow } = useUser()
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
    <div className='modal_register_change'>
      <X
        className='absolute cursor-pointer top-6 right-6'
        onClick={handleCloseModal}
      />
      <form className='form_register_change' onSubmit={handleSubmit(onSubmit)}>
        <div className='container_register_change'>
          <SubTitleForm style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <File
              size={29}
              stroke='#3F3F55'
              strokeWidth={1.5}
            />
            Cadastro de Cobrança
          </SubTitleForm>
          {/* <div className="form_register_change_container_inputs">
            <InputForm
              className={`${errors.name ? 'container_input_form_error' : 'container_input_form'}`}
              title={'Nome'}
              name={'name'}
              errors={errors.name}
              priority={true}
            >
              <input
                type="text"
                defaultValue={clientCreateChange.name}
                className="form_input_input"
                {...register('name')}
                placeholder="Digite seu nome"
                disabled
              />
            </InputForm>
            <div className={`${errors.description ? '' : 'container_input_form_description'}`}>
              <label
                className="form_label"
                htmlFor={'description'}>
                {'Descrição*'}
              </label>
              <div className={`${errors.description ? 'form_description_error' : 'form_description'}`}>

                <textarea
                  className="form_textarea_description"
                  {...register('description')}
                  placeholder="Digite a descrição"
                  rows="4"
                  maxLength='150'
                />

              </div>
              {errors.description && (
                <span className="error_message">{errors.description.message}</span>
              )}
            </div>
            <InputFormAlternative
              title1={'Vencimento'}
              name1={'due_date'}
              errors1={errors.due_date}
              priority1={true}
              title2={'value'}
              name2={'value'}
              errors2={errors.value}
              priority2={true}
            >
              <InputMask
                className="form_input_input"
                mask="99/99/9999"
                {...register('due_date')}
                placeholder="Data de Vencimento"
              />
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                placeholder="Digite o value"
                onChange={handleSetValue}
              />
            </InputFormAlternative>
            <CustomRadioButton
              handleOptionClick={handleOptionClick}
              selectedOption={selectedOption}
              register={register}
            />
          </div> */}
        </div>

        {apiError && <span className="error_message">{apiError}</span>}
        <ButtonsCancelApply onClick={handleCloseModal} />
      </form>
    </div>
  );
}
