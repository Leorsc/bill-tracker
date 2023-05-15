import Image from "next/image";
import SubTitleForm from "./subtitles/SubTitleForm";


export default function CongratsTemplate({ children }) {
  return (
    <div className="w-[600px] h-[512px] bg-lavander-grey flex items-center justify-center flex-col gap-6 rounded-[30px]">
      <Image src='/icons/congrats.svg' width={104} height={105} alt='congrats' />
      <SubTitleForm>{children}</SubTitleForm>
    </div>
  );
}