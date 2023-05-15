import * as yup from "yup";

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .required("Confirme a senha"),
});