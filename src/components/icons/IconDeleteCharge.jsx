import useUser from '@/hooks/useUser';
import { Trash2 } from 'lucide-react';

export default function IconDeleteChange({ charge, ...props }) {
  const { setOpenModalDeleteCharge, setDeleteCharge, openNotificationWindowError, openNotificationWindow } = useUser()

  function handleDeleteChargeInfos() {
    if (openNotificationWindowError || openNotificationWindow) {
      return
    }
    setOpenModalDeleteCharge(true)
    setDeleteCharge(charge)
  }

  return (
    <div className="flex flex-col items-center justify-between cursor-pointer" onClick={handleDeleteChargeInfos} {...props}>
      <Trash2 stroke="#AE1100" />
      <span className="font-nunito font-semibold text-[8px] text-red-2">Excluir</span>
    </div>
  );
}