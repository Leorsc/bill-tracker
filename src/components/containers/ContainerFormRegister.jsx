import ButtonForm from '../buttons/ButtonForm';
import GenericInput from '../GenericInput';
import InputPassword from '../InputPassword';
import SpanErrorForm from '../spans/SpanErrorForm';
import SpanLoginForm from '../spans/SpanLoginForm';
import SubTitleForm from '../subtitles/SubTitleForm';

export default function ContainerFormRegister({
  formStep,
  register,
  errors,
  apiError,
  handleLogin,
  handleNextButtonClick }) {
  return (
    <>
      {formStep === 0 && (
        <>
          <div className="flex flex-col items-center gap-8 w-[368px]">
            <SubTitleForm>Adicione seus dados</SubTitleForm>
            <div className="flex flex-col gap-5 w-full">
              <GenericInput
                title={'Nome'}
                name={'name'}
                errors={errors.name}
                priority={true}
                type={'text'}
                placeholder="Digite seu nome"
                register={register}
              />
              <GenericInput
                title={'E-mail'}
                name={'email'}
                errors={errors.email}
                priority={true}
                type="email"
                placeholder="Digite seu e-mail"
                register={register}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ButtonForm
              onClick={handleNextButtonClick}
              type='button'
            >
              Continuar
            </ButtonForm>
            <SpanLoginForm
              title={'Já possui uma conta? Faça seu'}
              button={'Login'}
              action={handleLogin} />
          </div>
        </>
      )}
      {formStep === 1 && (
        <>
          <div className="flex flex-col items-center gap-8 w-[368px]">
            <SubTitleForm>Escolha uma senha</SubTitleForm>
            <div className="flex flex-col gap-5 w-full">
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
          {apiError && <SpanErrorForm>{apiError}</SpanErrorForm>}
          <div className="flex flex-col items-center gap-4">
            <ButtonForm>
              Finalizar cadastro
            </ButtonForm>
            <SpanLoginForm title={'Já possui uma conta? Faça seu'} button={'Login'} handleLogin={handleLogin} />
          </div>
        </>
      )}
    </>
  );
}

