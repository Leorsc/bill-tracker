export default function SpanData({ title, info }) {
  return (
    <div className='flex flex-col items-start justify-between w-auto h-14 text-dark-slate-grey text-base'>
      <strong className="font-montserrat font-bold">{title}</strong>
      <span className="font-nunito">{info}</span>
    </div>
  );
}

