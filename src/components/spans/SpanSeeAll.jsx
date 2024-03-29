import Link from 'next/link';

export default function SpanSeeAll({ path, ...props }) {
  return (
    <div className='flex items-center justify-center w-full h-12 text-base'>
      <Link className='text-pink cursor-pointer hover:underline' href={path} {...props} >
        Ver todos
      </Link>
    </div>
  )
}