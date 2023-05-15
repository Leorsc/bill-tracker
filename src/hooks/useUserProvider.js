import { useState } from "react"

function useUserProvider() {
  const [user, setUser] = useState()

  const [clients, setClients] = useState()
  const [chargeDetails, setChargeDetails] = useState()
  const [clientCreateChange, setClientCreateChange] = useState()
  const [editCharge, setEditCharge] = useState('')
  const [deleteCharge, setDeleteCharge] = useState('')
  const [infosChargeEdit, setInfosChargeEdit] = useState()
  const [openModalEditUser, setOpenModalEditUser] = useState(false)
  const [openModalProfileUser, setOpenModalProfileUser] = useState(false)
  const [openModalRegisterClient, setOpenModalRegisterClient] = useState(false)
  const [openModalEditClient, setOpenModalEditClient] = useState(false)
  const [openModalRegisterCharge, setOpenModalRegisterCharge] = useState(false)
  const [openModalEditCharge, setOpenModalEditCharge] = useState(false)
  const [openModalDetailsCharge, setOpenModalDetailsCharge] = useState(false)
  const [openModalDeleteCharge, setOpenModalDeleteCharge] = useState(false)
  const [openNotificationWindow, setOpenNotificationWindow] = useState(false)
  const [openNotificationWindowError, setOpenNotificationWindowError] = useState(false)
  const [textNotification, setTextNotification] = useState('')
  const [refreshClients, setRefreshClients] = useState(false)
  const [refreshCharges, setRefreshCharges] = useState(false)

  return {
    user,
    setUser,
    clients,
    setClients,
    chargeDetails,
    setChargeDetails,
    infosChargeEdit,
    setInfosChargeEdit,
    editCharge,
    setEditCharge,
    deleteCharge,
    setDeleteCharge,
    openModalEditUser,
    setOpenModalEditUser,
    openModalProfileUser,
    setOpenModalProfileUser,
    openModalDetailsCharge,
    setOpenModalDetailsCharge,
    textNotification,
    setTextNotification,
    openModalEditClient,
    setOpenModalEditClient,
    clientCreateChange,
    setClientCreateChange,
    openModalRegisterClient,
    setOpenModalRegisterClient,
    openModalDeleteCharge,
    setOpenModalDeleteCharge,
    openModalRegisterCharge,
    setOpenModalRegisterCharge,
    openModalEditCharge,
    setOpenModalEditCharge,
    openNotificationWindow,
    setOpenNotificationWindow,
    openNotificationWindowError,
    setOpenNotificationWindowError,
    refreshClients,
    setRefreshClients,
    refreshCharges,
    setRefreshCharges,
    useState
  }
}

export default useUserProvider;
