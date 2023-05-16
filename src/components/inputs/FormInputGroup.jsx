import InputField from "./InputField";
import LabelForm from "../LabelForm";
import SpanErrorForm from "../spans/SpanErrorForm";

export default function FormInputGroup({ children, title, name, errors, priority, ...props }) {

  return (
    <div {...props}>
      <LabelForm htmlFor={name} priority={priority} title={title} />
      <InputField errors={errors}>
        {children}
      </InputField>
      {errors && (
        <SpanErrorForm>{errors.message}</SpanErrorForm>
      )}
    </div>
  )
}
