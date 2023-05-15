export default function SubTitlePage({ icon, title }) {
  return (
    <div className='flex items-center gap-4 font-montserrat font-semibold text-[26px] text-dark-slate-grey'>
      {icon}
      <span className="capitalize">{title}</span>
    </div>
  );
}

