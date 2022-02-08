import axios from 'axios'
import { parseCookies } from 'nookies'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAPIClient(ctx?: any) {
  const { 'muralturma-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://muralturma.herokuapp.com/'
  })

  // retorna todos os parâmetros da requisição
  api.interceptors.request.use((config) => {
    console.log(config)

    return config
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return api
}
