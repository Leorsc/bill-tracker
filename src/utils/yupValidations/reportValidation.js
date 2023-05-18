import moment from "moment";
import * as yup from "yup";

export const reportValidationSchema = yup.object().shape({
  date_initial: yup
    .string()
    .required('Este campo deve ser preenchido')
    .test('date', 'A data deve ser atual', function (value) {
      return moment(value, 'DD/MM/YYYY', true);
    }),

  date_final: yup
    .string()
    .required('Este campo deve ser preenchido')
    .test('date', 'A data deve ser atual', function (value) {
      return moment(value, 'DD/MM/YYYY', true);
    }),
});

