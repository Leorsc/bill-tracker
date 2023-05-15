import * as yup from "yup";

export const editUserValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Este campo deve ser preenchido"),
  email: yup
    .string()
    .required("O email é obrigatório")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Digite um email válido'),
  password: yup
    .string()
    .notRequired(),

  cpf: yup
    .string()
    .notRequired()
    .transform((value) => (value === "" ? null : value))
    .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'Digite um CPF válido'),

  phone: yup
    .string()
    .notRequired()
    .transform((value) => (value === "" ? null : value))
    .matches(/^(\(\d{2}\)\s)?\d{4,5}-\d{4}$/, 'Digite um telefone válido'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .notRequired(),
});
