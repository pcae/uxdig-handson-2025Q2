import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const KEY = 'queryKey'
const LIMIT = 10

export interface ObjectNameQueryParams {
  id: string
  name: string
}

export interface ObjectNameMutationParams {
  name: string
}

// Query
export const useObjectNameQuery = (params: ObjectNameQueryParams) => {
  const { data, error, isLoading, isFetching, ...resultrest } = useQuery({
    queryKey: [KEY, { ...params }],
    queryFn: () => fetchObjectName(params),
  })

  return { data, error, isLoading, isFetching, ...resultrest }
}

// Mutaiton
export const useObjectNameMutation = (params: ObjectNameMutationParams) => {
  return useMutation({ mutationFn: () => mutationFunctionName(params) })
}

const fetchObjectName = async (params: ObjectNameQueryParams) => {
  const result = await axios.get(`/api_url/${params}`).then((res) => res.data)
  return result
}

const mutationFunctionName = async (params: ObjectNameMutationParams) => {
  const result = await axios.get(`/api_url/${params}`).then((res) => res.data)
  return result
}
