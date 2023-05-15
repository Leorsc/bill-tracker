export default function SpanErrorForm({ children, ...props }) {

  return (
    <span className="font-inter text-sm leading-5 text-error-message" {...props}>{children}</span>
  )
}