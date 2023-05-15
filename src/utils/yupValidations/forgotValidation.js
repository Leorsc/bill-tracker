import * as yup from "yup";

export const forgotValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("O email é obrigatório")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Digite um email válido'),
});