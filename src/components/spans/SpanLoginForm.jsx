export default function SpanLoginForm({ action, title, button }) {
  return (
    <span className='flex gap-1 font-nunito text-lg text-dark-slate-grey'>
      {title}
      <button
        className="text-pink cursor-pointer hover:underline"
        onClick={action}
        type="button"
      >
        {button}
      </button>
    </span>
  );
}