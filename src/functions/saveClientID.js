import Cookies from "js-cookie";

export default function saveClientIdToCookies(clientId) {
  const existingClientId = Cookies.get('client-id');

  if (existingClientId) {
    if (existingClientId !== clientId) {
      Cookies.set('client-id', clientId);
    }
  } else {
    Cookies.set('client-id', clientId);
  }
}