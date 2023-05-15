export default function SubTitleForm({ children, ...props }) {
  return (
    <h1 className='font-montserrat font-bold text-2xl text-deep-night' {...props}>{children}</h1>
  )
}