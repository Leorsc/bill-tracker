import FormInputGroup from "./FormInputGroup";
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
  value1,
  value2,
  placeholder1,
  placeholder2,
  mask1,
  mask2,
  type1,
  type2,
  inputType_1,
  inputType_2,
  width_1,
  width_2,
  register }) {
  return (
    <div className={`flex w-full gap-6 ${errors1 || errors2 ? 'h-[88px]' : 'h-[70px]'}`}>
      <FormInputGroup
        className={`${width_1} h-full`}
        title={title1}
        name={name1}
        errors={errors1}
        priority={priority1}
      >
        {
          inputType_1 === 'mask' ?
            <InputMask
              className="w-full font-inter text-base text-input-form"
              mask={mask1}
              defaultValue={value1}
              placeholder={placeholder1}
              {...register(name1)}
            />
            :
            <input
              className="w-full font-inter text-base text-input-form"
              {...register(name1)}
              defaultValue={value1 ? value1 : ''}
              type={type1}
              placeholder={placeholder1}
            />
        }
      </FormInputGroup>
      <FormInputGroup
        className={`${width_2} h-full`}
        title={title2}
        name={name2}
        errors={errors2}
        priority={priority2}
      >
        {
          inputType_2 === 'mask' ?
            <InputMask
              className="w-full font-inter text-base text-input-form"
              mask={mask2}
              defaultValue={value2}
              placeholder={placeholder2}
              {...register(name2)}
            />
            :
            <input
              className="w-full font-inter text-base text-input-form"
              {...register(name2)}
              defaultValue={value2 ? value2 : ''}
              type={type2}
              placeholder={placeholder2}
            />
        }
      </FormInputGroup>
    </div>
  );
}