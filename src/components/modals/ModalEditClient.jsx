import useUser from '@/hooks/useUser';
import api from '@/services/api';
import { registerClientValidationSchema } from '@/utils/yupValidations/registerClientValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonsCancelApply from '../buttons/ButtonsCancelApply';
import ContainerModalEditClient from '../containers/ContainerModalEditClient';
import SpanErrorForm from '../spans/SpanErrorForm';
import SubTitleForm from '../subtitles/SubTitleForm';

export default function ModalEditClient({ client }) {
  const {
    setOpenModalEditClient,
    setTextNotification,
    setOpenNotificationWindow,
    setTypeNotification } = useUser()

  const [address, setAddress] = useState({
    zip_code: client.zip_code,
    street: client.street,
    neighborhood: client.neighborhood,
    city: client.city,
    state: client.state,
    complement: client.complement
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerClientValidationSchema),
  });

  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setValue('street', address.street || '');
    setValue('zip_code', address.zip_code || '');
    setValue('neighborhood', address.neighborhood || '');
    setValue('complement', address.complement || '')
    setValue('city', address.city || '');
    setValue('state', address.state || '');
  }, [setValue, address]);

  async function handleCepChange(e) {
    const lista = e.target.value.split('')

    if (lista[lista.length - 1] === '_') {
      return;
    }

    if (e.target.value === '') {
      return
    }

    const zip_code = e.target.value;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zip_code}/json/`);

      if (response.data.erro) {
        setApiError('CEP não encontrado');
        setTimeout(() => {
          setApiError(null)
        }, 2000)
      }

      setAddress({
        zip_code: zip_code,
        street: response.data.logradouro,
        complement: response.data.complemento,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf
      });

    } catch (error) {
      console.log(error)
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
      await api.put(`/client/${client.id}`,
        {
          name: clientFormat.name.replace(/\b\w/g, (letra) => letra.toUpperCase()),
          email: clientFormat.email,
          cpf: clientFormat.cpf,
          phone: clientFormat.phone,
          ...(clientFormat.password ? { password: clientFormat.password } : {}),
          ...(clientFormat.zip_code ? { zip_code: clientFormat.zip_code } : {}),
          ...(clientFormat.street ? { street: clientFormat.street } : {}),
          ...(clientFormat.neighborhood ? { neighborhood: clientFormat.neighborhood } : {}),
          ...(clientFormat.complement ? { complement: clientFormat.complement } : {}),
          ...(clientFormat.city ? { city: clientFormat.city } : {}),
          ...(clientFormat.state ? { state: clientFormat.state } : {})
        })
      handleCloseModal()

      setTimeout(() => {
        setTextNotification('Edições do cadastro concluídas com sucesso')
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

  function handleInputChange(event) {
    event.target.value = event.target.value.toUpperCase();
  };


  function handleCloseModal() {
    reset();
    setOpenModalEditClient(false)
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
            Editar Cliente
          </SubTitleForm>
          <ContainerModalEditClient
            register={register}
            errors={errors}
            handleCepChange={handleCepChange}
            handleInputChange={handleInputChange}
            isCepFilled={true}
            client={client}
          />
        </div>
        {apiError && <SpanErrorForm>{apiError}</SpanErrorForm>}
        <ButtonsCancelApply onClick={handleCloseModal} />
      </form>
    </div>
  );
}
