import useUser from "@/hooks/useUser";
import { Edit3, Trash2 } from "lucide-react";

export default function IconEditChange({ clientName, charge, ...props }) {
  const { setOpenModalEditCharge, setEditCharge, openNotificationWindowError, openNotificationWindow } = useUser()

  function handleEditChargeInfos() {
    if (openNotificationWindowError || openNotificationWindow) {
      return
    }
    setOpenModalEditCharge(true)
    setEditCharge({
      clientName,
      charge,
    })
  }

  return (
    <div className="flex flex-col items-center justify-between cursor-pointer" onClick={handleEditChargeInfos} {...props}>
      <Edit3 stroke="#747488" />
      <span className="font-nunito font-semibold text-[8px] text-graphite">Editar</span>
    </div>
  );
}