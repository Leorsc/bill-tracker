export default function LabelForm({ priority, title, ...props }) {

  return (
    <span className="font-nunito text-sm font-semibold leading-5 text-label-form" {...props}>{priority ? `${title}*` : title}</span>
  )
}