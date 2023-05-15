import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),

  email: yup
    .string()
    .required("O email é obrigatório")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Digite um email válido'),

  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .required("Confirme a senha"),
});