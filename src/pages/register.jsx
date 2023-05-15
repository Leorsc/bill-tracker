import ButtonForm from '@/components/buttons/ButtonForm';
import CongratsTemplate from '@/components/CongratsTemplate';
import ContainerFormRegister from '@/components/containers/ContainerFormRegister';
import HorizontalStepper from '@/components/steppers/HorizontalStepper';
import VerticalStepper from '@/components/steppers/VerticalStepper';
import api from '@/services/api';
import { signUpValidationSchema } from '@/utils/yupValidations/singUpValidation';
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const [apiError, setApiError] = useState(null);
  const [formStep, setFormStep] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false)


  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (token) {
      router.push('/')
    } else {
      setDomLoaded(true);
    }
  }, [])

  async function handleNextButtonClick() {
    const isValid = await trigger(['name', 'email']);
    if (!isValid) {
      return
    }

    setFormStep(formStep + 1);
  }

  function handleLogin() {
    router.push('/login')
  }

  async function onSubmit(data) {
    try {
      await api.post("/user", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setFormStep(2)

    } catch (error) {
      if (error.response?.data?.error === "User already exists") {
        setApiError("Este email já está cadastrado.");
        setTimeout(() => {
          setApiError(null)
          setFormStep(0)
        }, 2000)
      } else {
        setApiError("Erro ao realizar cadastro.");
        setTimeout(() => {
          setApiError(null)
          setFormStep(0)
        }, 2000)
      }
    }
  }

  return (
    <>
      <Head>
        <title>{`${domLoaded ? 'BillTracker - Cadastro' : 'Loading...'}`}</title>
      </Head>
      {
        domLoaded &&
        <main className='h-screen flex items-center'>
          <div className="w-[34.7%] pt-[172px] pr-[61px] pb-[505px] pl-[49px] bg-lavander-grey h-full">
            <div>
              <VerticalStepper formStep={formStep} />
            </div>
          </div>
          {formStep !== 2 ?
            <div className="flex flex-col items-center h-full w-[65.3%] pt-[208px] pr-[267px] pb-0 pl-[293px] relative">
              {/* <form className="flex flex-col items-center justify-between gap-10" onSubmit={handleSubmit(onSubmit)}>
                <ContainerFormRegister
                  formStep={formStep}
                  register={register}
                  errors={errors}
                  apiError={apiError}
                  handleLogin={handleLogin}
                  handleNextButtonClick={handleNextButtonClick}
                />
              </form> */}
              <HorizontalStepper formStep={formStep} setFormStep={setFormStep} />
            </div>
            :
            <div className="flex flex-col items-center h-full w-[65.3%] pt-[108px] pr-[267px] pb-0 pl-[293px]">
              <CongratsTemplate>
                Cadastro realizado com sucesso!
              </CongratsTemplate>
              <div className="mt-6">
                <ButtonForm onClick={handleLogin}>
                  Ir para Login
                </ButtonForm>
              </div>
              <HorizontalStepper formStep={formStep} setFormStep={setFormStep} />
            </div>
          }
        </main>
      }
    </>
  )
}