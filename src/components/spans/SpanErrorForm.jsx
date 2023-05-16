export default function SpanErrorForm({ children, ...props }) {

  return (
    <span className="font-inter text-xs leading-5 text-error-message" {...props}>{children}</span>
  )
}