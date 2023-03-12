import axios from "axios";

export async function requestAccessToken() {
  const params = new URLSearchParams();
  params.append('client_id', process.env.REACT_APP_VITO_CLIENT_ID || '');
  params.append('client_secret', process.env.REACT_APP_VITO_CLIENT_SECRET || '');
  try {
    return await axios.post('https://openapi.vito.ai/v1/authenticate', params);
  } catch (e) {
    console.error(e);
  }
}