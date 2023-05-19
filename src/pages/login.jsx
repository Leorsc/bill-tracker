import ButtonForm from '@/components/buttons/ButtonForm';
import GenericInput from '@/components/inputs/GenericInput';
import InputPassword from '@/components/inputs/InputPassword';
import SpanErrorForm from '@/components/spans/SpanErrorForm';
import SpanLoginForm from '@/components/spans/SpanLoginForm';
import SubTitleForm from '@/components/subtitles/SubTitleForm';
import api from '@/services/api';
import { signInValidationSchema } from '@/utils/yupValidations/signInValidation';
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const [domLoaded, setDomLoaded] = useState(false)
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (token) {
      router.push('/')
    } else {
      setDomLoaded(true);
    }
  }, [])

  function handleRegister() {
    router.push('/register')
  }

  async function onSubmit(data) {
    try {
      const response = await api.post('/login', {
        email: data.email,
        password: data.password
      })

      Cookies.set('auth-token', response.data.token)
      router.push('/')

    } catch (error) {
      setApiError("Email ou senha incorretos!");
      setTimeout(() => {
        setApiError(null)
      }, 2000)
    }
  }

  return (
    <>
      <Head>
        <title>{`${domLoaded ? 'BillTracker - Login' : 'Loading...'}`}</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='w-[34.7%] h-full pt-[172px] pr-[61px] pb-[505px] pl-[49px] relative'>
            <div className='absolute top-0 left-0 w-full h-full bg-login bg-[url(/images/bg-login.png)] bg-cover bg-no-repeat bg-center'></div>
          </div>
          <div className='flex flex-col items-center h-full w-[65.3%] pt-[235px] pr-[292px] pb-[324px] pl-[293px] relative'>
            <form className="flex flex-col items-center justify-between gap-10" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center gap-8 w-[343px]">
                <SubTitleForm>Faça seu login!</SubTitleForm>
                <div className="flex flex-col gap-4 w-full relative">
                  <GenericInput
                    title={'E-mail'}
                    name={'email'}
                    errors={errors.email}
                    priority={false}
                    type="email"
                    placeholder="Digite seu e-mail"
                    register={register}
                  />
                  <InputPassword
                    title={'Senha'}
                    name={'password'}
                    errors={errors.password}
                    priority={false}
                    register={register}
                    placeholder="Digite sua senha"
                  />
                  <span
                    onClick={() => router.push('/forgot')}
                    className={`font-nunito text-pink cursor-pointer absolute text-sm right-0 hover:underline ${errors.password ? 'bottom-16' : 'bottom-12'}`}>
                    Esqueceu a senha?
                  </span>
                </div>
              </div>
              {apiError && <SpanErrorForm>{apiError}</SpanErrorForm>}
              <div className="flex flex-col items-center gap-4">
                <ButtonForm>
                  Entrar
                </ButtonForm>
                <SpanLoginForm
                  title={'Ainda não possui uma conta?'}
                  button={'Cadastre-se'}
                  action={handleRegister}
                />
              </div>
            </form>
          </div>
        </>
      }
    </>
  )
}