export default function InputField({ children, errors, ...props }) {

  return (
    <div className={`relative w-full h-11 px-[14px] py-[10px] rounded-lg ${errors ? 'border border-error-message' : 'border border-border-input'}`} {...props}>
      {children}
    </div>
  )
}
