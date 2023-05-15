import FormInputGroup from "./FormInputGroup";

export default function GenericInput({
  errors,
  priority,
  title,
  register,
  name,
  type,
  placeholder,
  value }) {
  return (
    <FormInputGroup
      className={`flex flex-col items-start w-full ${errors ? 'h-[88px]' : 'h-[70px]'}`}
      title={title}
      name={name}
      errors={errors}
      priority={priority}
    >
      <input
        className="w-full font-inter text-base text-input-form"
        {...register(name)}
        defaultValue={value ? value : ''}
        type={type}
        placeholder={placeholder}
      />
    </FormInputGroup>
  );
}