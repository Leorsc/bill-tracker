import ButtonForm from '@/components/buttons/ButtonForm';
import SubTitleForm from '@/components/subtitles/SubTitleForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPasswordValidationSchema } from '@/utils/yupValidations/resetPasswordValidation';
import Cookies from 'js-cookie';
import Head from 'next/head';
import InputPassword from '@/components/inputs/InputPassword';
import api from '@/services/api';

export default function Reset() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const [emailSend, setEmailSend] = useState(true)
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (token) {
      router.push('/')
    } else {
      setDomLoaded(true);
    }
  }, [])


  async function onSubmit(data) {
    const { token } = router.query
    console.log(token)
    console.log(data)
    try {
      await api.put(`/reset_password/${token}`, {
        newPassword: data.password
      })
      setEmailSend(false)
      setTimeout(() => {
        router.push('/login')
      }, 1500)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>{`${domLoaded ? 'BillTracker - Reset Password' : 'Loading...'}`}</title>
      </Head>
      {
        domLoaded &&
        <>
          <div className='w-[34.7%] h-full pt-[172px] pr-[61px] pb-[505px] pl-[49px] relative'>
            <div className='absolute top-0 left-0 w-full h-full bg-login bg-[url(/images/bg-login.png)] bg-cover bg-no-repeat bg-center'></div>
          </div>
          <div className='flex items-center justify-center h-full w-[65.3%] relative'>
            {emailSend ?
              <>
                <form className="flex flex-col items-center justify-between gap-10" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center gap-8 w-[343px]">
                    <SubTitleForm>Redefinir a senha</SubTitleForm>
                    <p className='text-start font-montserrat text-sm text-dark-slate-grey'>
                      Crie uma senha com no mínimo
                      <strong className='ml-1'>
                        8 caracteres
                      </strong>
                      .
                    </p>
                    <div className="flex flex-col gap-4 w-full relative">
                      <InputPassword
                        title={'Senha'}
                        name={'password'}
                        errors={errors.password}
                        priority={false}
                        register={register}
                        placeholder="••••••••"
                        rules={{ required: true }}
                        shouldFocusError={false}
                      />
                      <InputPassword
                        title={'Confirmar senha'}
                        name={'confirmPassword'}
                        errors={errors.confirmPassword}
                        priority={false}
                        register={register}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <ButtonForm>
                      Redefinir
                    </ButtonForm>
                  </div>
                </form>

              </>
              :
              <>
                <CongratsTemplate>
                  Senha alterada com sucesso!
                </CongratsTemplate>

              </>
            }
          </div>
        </>
      }
    </>
  )
}


