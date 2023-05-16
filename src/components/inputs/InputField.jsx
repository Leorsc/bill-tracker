export default function InputField({ children, errors, ...props }) {

  return (
    <div className={`relative w-full h-11 px-3.5 py-2.5 rounded-lg ${errors ? 'border border-error-message' : 'border border-border-input'}`} {...props}>
      {children}
    </div>
  )
}
