import * as yup from "yup";

export const registerClientValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Este campo deve ser preenchido'),

  email: yup
    .string()
    .required('Este campo deve ser preenchido')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Digite um email válido'),

  cpf: yup
    .string()
    .required('Este campo deve ser preenchido')
    .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'Digite um CPF válido'),


  phone: yup
    .string()
    .required('Este campo deve ser preenchido')
    .matches(/^(\(\d{2}\)\s)?\d{4,5}-\d{4}$/, 'Digite um telefone válido'),


  zip_code: yup
    .string(),

  street: yup
    .string(),

  complement: yup
    .string(),

  neighborhood: yup
    .string(),

  city: yup
    .string(),

  state: yup
    .string(),
});