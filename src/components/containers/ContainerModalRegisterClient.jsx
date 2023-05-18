import AlternativeInput from "../AlternativeInput";
import GenericInput from "../inputs/GenericInput";

export default function ContainerModalRegisterClient({ register, errors, handleCepChange, isCepFilled, handleInputChange }) {
  return (
    <div className='flex flex-col gap-2'>
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
      <AlternativeInput
        title1={'CPF'}
        name1={'cpf'}
        errors1={errors.cpf}
        priority1={true}
        inputType_1={'mask'}
        width_1='w-1/2'
        input1={{
          mask: "999.999.999-99",
          placeholder: "Digite seu CPF"
        }}
        title2={'Telefone'}
        name2={'phone'}
        errors2={errors.phone}
        priority2={true}
        inputType_2={'mask'}
        width_2='w-1/2'
        input2={{
          mask: "(99) 99999-9999",
          placeholder: "Digite seu Telefone"
        }}
        register={register}
      />
      <AlternativeInput
        title1={'CEP'}
        name1={'zip_code'}
        errors1={null}
        priority1={false}
        inputType_1={'mask'}
        width_1='w-1/2'
        input1={{
          mask: "99999-999",
          placeholder: "Digite o CEP",
          onChange: handleCepChange
        }}
        title2={'Bairro'}
        name2={'neighborhood'}
        errors2={null}
        priority2={false}
        width_2='w-1/2'
        input2={{
          type: 'text',
          placeholder: "Digite o bairro",
          disabled: !isCepFilled
        }}
        register={register}
      />
      <GenericInput
        title={'Endereço'}
        name={'street'}
        priority={false}
        errors={errors.street}
        type='text'
        placeholder="Digite seu endereço"
        register={register}
        disabled={!isCepFilled}
      />
      <GenericInput
        title={'Complemento'}
        name={'complement'}
        priority={false}
        errors={errors.complement}
        type='text'
        placeholder="Digite o complemento"
        register={register}
        disabled={!isCepFilled}
      />

      <AlternativeInput
        title1={'Cidade'}
        name1={'city'}
        errors1={null}
        priority1={false}
        width_1='w-[403px]'
        input1={{
          type: 'text',
          placeholder: "Digite a cidade",
          disabled: !isCepFilled,
          onChange: handleInputChange
        }}
        title2={'UF'}
        name2={'state'}
        errors2={null}
        priority={false}
        width_2='w-[65px]'
        input2={{
          type: 'text',
          maxLength: "2",
          pattern: "[A-Za-z]{2}",
          disabled: !isCepFilled
        }}
        register={register}
      />
    </div>
  );
}