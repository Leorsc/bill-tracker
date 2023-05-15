import moment from "moment";
import * as yup from "yup";

export const registerChangeValidationSchema = yup.object().shape({
  name: yup.string(),

  description: yup
    .string()
    .required('Este campo deve ser preenchido'),

  due_date: yup
    .string()
    .required('Este campo deve ser preenchido')
    .test('date', 'A data deve ser atual', function (value) {
      return moment(value, 'DD/MM/YYYY', true);
    }),

  value: yup
    .string()
    .required('Este campo deve ser preenchido'),

  status: yup
    .string()
});

