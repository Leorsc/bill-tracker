import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import FormInputGroup from './FormInputGroup';

export default function InputPassword({ errors, priority, title, register, name, placeholder, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeView, setEyeView] = useState(false)

  function handleTogglePassword() {
    if (showPassword) {
      setShowPassword(false);
      setEyeView(false)
      return;
    }
    setShowPassword(true);
    setEyeView(true)
    return;
  };
  return (
    <FormInputGroup
      className={`flex flex-col items-start w-full ${errors ? 'h-[88px]' : 'h-[70px]'}`}
      title={title}
      name={name}
      errors={errors}
      priority={priority}
    >
      <>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-11/12 font-inter text-base text-input-form"
          {...register(name)}
          {...props}
          placeholder={placeholder}
        />
        {eyeView ?
          <Eye className='absolute right-4 top-3 cursor-pointer' size={18} stroke='#747488' onClick={handleTogglePassword} />
          :
          <EyeOff className='absolute right-4 top-3 cursor-pointer' size={18} stroke='#747488' onClick={handleTogglePassword} />
        }
      </>
    </FormInputGroup>
  );
}