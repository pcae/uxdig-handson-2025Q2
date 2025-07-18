export interface GlobalUI {}

export interface GlobalState {
  isLoading: boolean
}

export interface ErrorState {
  isError: boolean
  status: number | undefined
  message: string
}

export interface LocalStorage {
  [key: string]: string | null
}
