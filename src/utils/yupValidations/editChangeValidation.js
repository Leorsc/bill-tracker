import moment from "moment";
import * as yup from "yup";

export const editChangeValidationSchema = yup.object().shape({
  name: yup.string(),

  description: yup
    .string(),

  due_date: yup
    .string()
    .test('date', 'A data deve ser atual', function (value) {
      return moment(value, 'DD/MM/YYYY', true);
    }),

  value: yup
    .string(),

  status: yup
    .string()
});

