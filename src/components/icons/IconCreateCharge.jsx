import { FilePlus } from "lucide-react";

export default function IconCreateCharge({ ...props }) {
  return (
    <div className="flex flex-col items-center justify-between h-full cursor-pointer" {...props}>
      <FilePlus stroke="#DA0175" />
      <span className="font-nunito font-semibold text-[8px] text-pink">Cobrança</span>
    </div>
  );
}

