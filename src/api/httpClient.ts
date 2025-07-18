// eslint-disable-next-line import/named
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import { firebaseAuth } from 'src/stores/state/authState/firebase'

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN ?? '/'

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 10,
})

// Add an interceptor to refresh the token
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const user = firebaseAuth.currentUser
    if (user) {
      const token = await user.getIdToken() // true forces token refresh
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const httpClient = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController()

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    signal: controller.signal,
  })
    .then(({ data }) => data)
    .catch((e) => {
      if (isAxiosError(e)) {
        throw e.response?.data
      }

      throw e
    })

  // @ts-ignore
  promise.cancel = () => {
    controller.abort('Query was cancelled')
  }

  return promise
}

export default httpClient

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData
