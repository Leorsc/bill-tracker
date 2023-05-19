export default function ButtonDownload({ children, icon, ...props }) {
  return (
    <button
      className='flex 
      items-center 
      justify-center 
      gap-1
      w-auto 
      h-[35px]
      px-8 
      border-light-greyish 
      border border-solid 
      bg-light-greyish-white 
      rounded-ten 
      text-dark-green 
      font-nunito 
      text-lg 
      cursor-pointer' {...props} >
      {icon}
      {children}
    </button>
  )
}