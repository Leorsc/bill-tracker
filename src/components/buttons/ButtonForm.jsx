export default function ButtonForm({ children, ...props }) {
  return (
    <button
      className='w-40 h-8 bg-pink rounded-[10px] text-light-greyish-white text-center font-nunito text-lg cursor-pointer active:scale-105' {...props} >
      {children}
    </button>
  )
}