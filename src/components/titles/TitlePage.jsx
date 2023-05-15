import Link from "next/link";

export default function TitlePage({ page }) {

  if (page === 'home') {
    return (
      <h1 className='absolute left-[50px] top-[14px] font-montserrat font-semibold text-[26px] text-deep-night'>
        Resumo das cobranças
      </h1>
    );
  }

  if (page === 'clients') {
    return (
      <span className='absolute left-[71px] bottom-0 font-inter  text-base text-dark-green'>
        Clientes
      </span>
    );
  }
  if (page === 'charges') {
    return (
      <span className='absolute left-[71px] bottom-0 font-inter  text-base text-dark-green'>
        Cobranças
      </span>
    );
  }

  if (page === 'client_details') {
    return (
      <div className='absolute left-[71px] bottom-0 font-inter  text-base text-dark-green'>
        <Link href='/clients' >
          Clientes
        </Link>

        <span className="text-[#747488]">
          {' > '} Detalhes do cliente
        </span>
      </div>
    );
  }

}
