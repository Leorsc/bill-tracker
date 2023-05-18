import { useState } from "react"

function useUserProvider() {
  const [user, setUser] = useState()

  const [clients, setClients] = useState()
  const [chargeDetails, setChargeDetails] = useState()
  const [charges, setCharges] = useState()
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
  const [typeNotification, setTypeNotification] = useState()

  return {
    user,
    setUser,
    clients,
    setClients,
    chargeDetails,
    setChargeDetails,
    charges,
    setCharges,
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
    typeNotification,
    setTypeNotification,
    useState
  }
}

export default useUserProvider;
