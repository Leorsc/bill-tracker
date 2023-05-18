import useUser from '@/hooks/useUser';
import { registerClientValidationSchema } from '@/utils/yupValidations/registerClientValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonsCancelApply from '../buttons/ButtonsCancelApply';
import ContainerModalRegisterClient from '../containers/ContainerModalRegisterClient';
import SpanErrorForm from '../spans/SpanErrorForm';
import SubTitleForm from '../subtitles/SubTitleForm';
import api from '@/services/api';
import { useRouter } from 'next/router';


export default function ModalRegisterClient() {
  const router = useRouter()
  const {
    setOpenModalRegisterClient,
    setTextNotification,
    setOpenNotificationWindow,
    setTypeNotification } = useUser()

  const [address, setAddress] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerClientValidationSchema),
  });
  const [isCepFilled, setIsCepFilled] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setValue('street', address.logradouro || '');
    setValue('neighborhood', address.bairro || '');
    setValue('complement', address.complemento || '')
    setValue('city', address.localidade || '');
    setValue('state', address.uf || '');
  }, [address, setValue]);

  async function handleCepChange(e) {
    const lista = e.target.value.split('')
    if (lista[lista.length - 1] === '_') {
      return;
    }
    const zip_code = e.target.value;
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zip_code}/json/`);

      if (response.data.erro) {
        setApiError('CEP não encontrado');
        setTimeout(() => {
          setApiError(null)
        }, 2000)
        return
      }
      setIsCepFilled(true);
      setAddress(response.data);
    } catch (error) {
      console.log(error.response)
    }
  }

  function formatClientInput(userInput) {
    const cpf = userInput.cpf.replace(/\D/g, '');
    const zipCode = userInput.zip_code.replace(/\D/g, '');
    const phone = userInput.phone.replace(/\D/g, '');
    return {
      ...userInput,
      cpf,
      zip_code: zipCode,
      phone,
    };
  }

  async function onSubmit(data) {
    const clientFormat = formatClientInput(data)
    try {
      await api.post('/client',
        {
          name: clientFormat.name.replace(/\b\w/g, (letra) => letra.toUpperCase()),
          email: clientFormat.email,
          cpf: clientFormat.cpf,
          phone: clientFormat.phone,
          ...(clientFormat.zip_code ? { zip_code: clientFormat.zip_code } : {}),
          ...(clientFormat.street ? { street: clientFormat.street } : {}),
          ...(clientFormat.neighborhood ? { neighborhood: clientFormat.neighborhood } : {}),
          ...(clientFormat.complement ? { complement: clientFormat.complement } : {}),
          ...(clientFormat.city ? { city: clientFormat.city } : {}),
          ...(clientFormat.state ? { state: clientFormat.state } : {})
        })
      handleCloseModal()

      setTimeout(() => {
        setTextNotification('Cadastro concluído com sucesso')
        setOpenNotificationWindow(true)
        setTypeNotification('accept')
      }, 1000)

      router.reload()

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

  function handleInputChange(event) {
    event.target.value = event.target.value.toUpperCase();
  };

  function handleCloseModal() {
    reset();
    setOpenModalRegisterClient(false)
  }

  return (
    <div className='relative bg-white w-[600px] h-auto rounded-4xl py-10 px-14'>
      <X
        className='absolute cursor-pointer top-6 right-6'
        onClick={handleCloseModal}
      />
      <form className='flex flex-col items-center justify-between w-full gap-[57px]' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 w-full'>
          <SubTitleForm style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Users size={28} stroke="#3F3F55" />
            Cadastro do Cliente
          </SubTitleForm>
          <ContainerModalRegisterClient
            register={register}
            errors={errors}
            handleCepChange={handleCepChange}
            handleInputChange={handleInputChange}
            isCepFilled={isCepFilled}
          />
        </div>
        {apiError && <SpanErrorForm>{apiError}</SpanErrorForm>}
        <ButtonsCancelApply onClick={handleCloseModal} />
      </form >
    </div >
  );
}
