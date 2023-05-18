import useUser from "@/hooks/useUser";
import api from "@/services/api";
import { editUserValidationSchema } from "@/utils/yupValidations/editUserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AlternativeInput from "../AlternativeInput";
import CongratsTemplate from "../CongratsTemplate";
import ButtonForm from "../buttons/ButtonForm";
import GenericInput from "../inputs/GenericInput";
import InputPassword from "../inputs/InputPassword";
import SubTitleForm from "../subtitles/SubTitleForm";

export default function ModalEditProfileUser() {
  const {
    user,
    setUser,
    setOpenModalProfileUser,
    setOpenModalEditUser,
  } = useUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserValidationSchema),
  });

  const [congratsUpdate, setCongratsUpdate] = useState(false)
  const [apiError, setApiError] = useState(null);

  function handleCloseModal() {
    reset();
    setOpenModalEditUser(false);
    setOpenModalProfileUser(false);
  }

  async function getUser() {
    try {
      const response = await api.get('/user')
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function onSubmit(data) {
    try {
      await api.put('/user',
        {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
          ...(data.password ? { password: data.password } : {})
        })
      setCongratsUpdate(true)
      getUser()
      setTimeout(() => {
        handleCloseModal()
        getUser()
      }, 2500)

    } catch (error) {
      if (error.response?.data?.error === "Email already exists") {
        setApiError("Este email já está cadastrado.");
        setTimeout(() => {
          setApiError(null)
        }, 2000)
      }
      console.log(error.response.data)

    }
  }

  return (
    <>
      {!congratsUpdate ?
        <div className='relative w-[491px] h-auto rounded-4xl py-10 px-14 bg-white'>
          <X
            className='absolute cursor-pointer top-6 right-6'
            onClick={handleCloseModal}
          />
          <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-8 w-full">
              <SubTitleForm>
                Edite seu cadastro
              </SubTitleForm>
              <div className="flex flex-col w-full gap-5">
                <GenericInput
                  title={'Nome'}
                  name={'name'}
                  errors={errors.name}
                  priority={true}
                  type={'text'}
                  placeholder="Digite seu nome"
                  value={user.name}
                  register={register}
                />
                <GenericInput
                  title={'E-mail'}
                  name={'email'}
                  errors={errors.email}
                  priority={true}
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={user.email}
                  register={register}
                />
                <AlternativeInput
                  title1={'CPF'}
                  name1={'cpf'}
                  errors1={null}
                  priority1={false}
                  inputType_1={'mask'}
                  width_1='w-1/2'
                  input1={{
                    mask: "999.999.999-99",
                    defaultValue: user.cpf,
                    placeholder: "Digite seu CPF"
                  }}
                  title2={'Telefone'}
                  name2={'phone'}
                  errors2={null}
                  priority2={false}
                  inputType_2={'mask'}
                  width_2='w-1/2'
                  input2={{
                    mask: "(99) 99999-9999",
                    defaultValue: user.phone,
                    placeholder: "Digite seu Telefone"
                  }}
                  register={register}
                />
                <InputPassword
                  title={'Nova Senha'}
                  name={'password'}
                  errors={errors.password}
                  priority={true}
                  register={register}
                  placeholder="••••••••"
                />
                <InputPassword
                  title={'Confirmar Senha'}
                  name='confirmPassword'
                  errors={errors.confirmPassword}
                  priority={true}
                  register={register}
                  placeholder="••••••••"
                />
              </div>
            </div>
            {apiError && <span className="error_message">{apiError}</span>}
            <div className="flex flex-col items-center">
              <ButtonForm style={{ height: '34px' }}>
                Aplicar
              </ButtonForm>
            </div>
          </form>
        </div>
        :
        <CongratsTemplate>
          Cadastro Alterado com sucesso!
        </CongratsTemplate>
      }
    </>
  );
}

