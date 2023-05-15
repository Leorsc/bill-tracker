import * as yup from "yup";

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("O email é obrigatório")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Digite um email válido'),


  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});