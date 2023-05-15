import Image from "next/image";

export default function NotFoundSearch() {
  return (
    <div className="flex flex-col items-center justify-center gap w-full h-auto py-[63px] gap-[70px]">
      <div className='flex items-center justify-center w-auto h-auto'>
        <Image src='/icons/not_found_search.svg' width={354} height={260} alt='search not found' />
      </div>
      <div className='flex flex-col items-center justify-center font-montserrat text-center gap-4'>
        <h1 className='text-[#F08889] text-[28px] font-semibold'>Nenhum resultado foi encontrado!</h1>
        <h2 className='text-[#9B9BB2]] text-2xl font-semibold'>Verifique se a escrita está correta</h2>
      </div>
    </div>
  );
}


