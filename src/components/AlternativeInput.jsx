import FormInputGroup from "./inputs/FormInputGroup";
import InputMask from 'react-input-mask';

export default function AlternativeInput({
  errors1,
  errors2,
  title1,
  title2,
  name1,
  name2,
  priority1,
  priority2,
  inputType_1,
  inputType_2,
  width_1,
  width_2,
  register,
  ...props
}) {

  //inputMask
  // input1={{
  //   mask={mask1}
  //   defaultValue={value1}
  //   placeholder={placeholder1}
  // }}

  //inputpadrão
  // input1={{
  //   placeholder={placeholder1}
  //   type={type1}
  //   defaultValue={value1}
  // }}

  return (
    <div className={`flex w-full gap-x-6 ${errors1 || errors2 ? 'h-[88px]' : 'h-[70px]'}`}>
      <FormInputGroup
        className={`flex flex-col ${width_1} h-full`}
        title={title1}
        name={name1}
        errors={errors1}
        priority={priority1}
      >
        {
          inputType_1 === 'mask' ?
            <InputMask
              className="w-full font-inter text-base text-input-form"
              {...register(name1)}
              {...props.input1}
            />
            :
            <input
              className="w-full font-inter text-base text-input-form"
              {...register(name1)}
              {...props.input1}
            />
        }
      </FormInputGroup>
      <FormInputGroup
        className={`flex flex-col ${width_2} h-full`}
        title={title2}
        name={name2}
        errors={errors2}
        priority={priority2}
      >
        {
          inputType_2 === 'mask' ?
            <InputMask
              className="w-full font-inter text-base text-input-form"
              {...register(name2)}
              {...props.input2}
            />
            :
            <input
              className="w-full font-inter text-base text-input-form"
              {...register(name2)}
              {...props.input2}
            />
        }
      </FormInputGroup>
    </div>
  );
}
