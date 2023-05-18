import handleNameFormat from "@/functions/formatName";
import Link from "next/link";

export default function SpanNameClient({ path, name, width, ...props }) {
  return (
    <span className={`flex items-center justify-start w-[${width}] h-full capitalize`} {...props}>
      <Link href={path}>
        {name ? handleNameFormat(name) : ""}
      </Link>
    </span>
  )
}