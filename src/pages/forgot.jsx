import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import GenericInput from '@/components/GenericInput';
import { useRouter } from 'next/router';
import ButtonForm from '@/components/buttons/ButtonForm';
import CongratsTemplate from '@/components/CongratsTemplate';
import SubTitleForm from '@/components/subtitles/SubTitleForm';
import { forgotValidationSchema } from '@/utils/yupValidations/forgotValidation';
import Cookies from 'js-cookie';
import Head from 'next/head';

export default function Forgot() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotValidationSchema),
  });
  const [domLoaded, setDomLoaded] = useState(false)
  const [emailSend, setEmailSend] = useState(true)

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (token) {
      router.push('/')
    } else {
      setDomLoaded(true);
    }
  }, [])

  function handleLogin() {
    router.push('/login')
  }


  async function onSubmit(data) {
    try {
      console.log(data)
      await api.post('/user/forgot', {
        email: data.email,
      })
      setEmailSend(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>{`${domLoaded ? 'BillTracker - Forget' : 'Loading...'}`}</title>
      </Head>
      {
        domLoaded &&
        <main className="h-screen flex items-center">
          <div className='w-[34.7%] h-full pt-[172px] pr-[61px] pb-[505px] pl-[49px] relative'>
            <div className='absolute top-0 left-0 w-full h-full bg-login bg-[url(/images/bg-login.png)] bg-cover bg-no-repeat bg-center'></div>
          </div>
          <div className='flex items-center justify-center h-full w-[65.3%] relative'>
            {emailSend ?
              <>
                <form className="flex flex-col items-center justify-between gap-10" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center gap-8 w-[343px]">
                    <SubTitleForm>Esqueceu sua senha?</SubTitleForm>
                    <p className='font-montserrat text-sm text-dark-slate-grey'>Enviaremos um e-mail com instruções de como redefinir sua senha.</p>
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
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <ButtonForm style={{ width: '45%' }}>
                      Enviar
                    </ButtonForm>
                    <ButtonForm style={{ width: '45%' }} onClick={handleLogin} type='button'>
                      Cancelar
                    </ButtonForm>
                  </div>
                </form>

              </>
              :
              <>
                <CongratsTemplate>
                  E-mail enviado com sucesso!
                </CongratsTemplate>
                <div className="mt-6">
                  <ButtonForm onClick={handleLogin}>
                    Ir para Login
                  </ButtonForm>
                </div>
              </>
            }
          </div>
        </main>
      }
    </>
  )
}