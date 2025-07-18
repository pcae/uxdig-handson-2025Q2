import { http } from 'msw'
import { getSample, postSample, putSample } from 'src/mocks/api/user_sample'

const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN + '/api'

export const handlers = [
  http.get(baseURL + '/user_sample', getSample),
  http.post(baseURL + '/user_sample', postSample),
  http.put(baseURL + '/user_sample', putSample),
]
