import { AxiosError } from 'axios'
import { atom, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useEffect, useRef } from 'react'
import { ErrorState, GlobalState } from './types'

// initialize
const initState: GlobalState = {
  isLoading: false,
}
const initMount = false
const initProgress = false
const initInteractive = false
const initErrorState = {
  isError: false,
  status: undefined,
  message: '',
}
const globalStateAtom = atom<GlobalState>(initState)
const mountStateAtom = atom<boolean>(initMount)
const progressStateAtom = atom<boolean>(initProgress)
const interactiveStateAtom = atom<boolean>(initInteractive)
const errorStateAtom = atom<ErrorState>(initErrorState)

export const useGlobalState = () => {
  useHydrateAtoms([[globalStateAtom, initState]])
  useHydrateAtoms([[errorStateAtom, initErrorState]])
  useHydrateAtoms([[interactiveStateAtom, initInteractive]])
  const [globalState, setGlobalState] = useAtom(globalStateAtom)
  const [isMountReady, setMountState] = useAtom(mountStateAtom)
  const [errorState, setError] = useAtom(errorStateAtom)
  const [isProgress, setProgress] = useAtom(progressStateAtom)
  const [isInteractive, setInteractive] = useAtom(interactiveStateAtom)
  const { isLoading } = globalState

  useEffect(() => {
    if (!isInteractive) setInteractive(true)
  }, [])

  const toggleLoading = (isLoading: boolean) => {
    setGlobalState({
      ...globalState,
      isLoading: isLoading,
    })
  }

  // Display progress bar for page transition (timeout 7s)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const toggleProgress = (isProgress: boolean) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setProgress(isProgress)

    if (isProgress) {
      timerRef.current = setTimeout(() => {
        setProgress(false)
      }, 7000)
    }
  }

  const toggleMountReady = (isMountReady: boolean) => {
    setMountState(isMountReady)
  }

  const resetErrorState = () => {
    setError({
      isError: false,
      status: undefined,
      message: '',
    })
  }

  const setErrorState = (error: AxiosError | null, customMessage?: string) => {
    if (error) {
      setError({
        isError: true,
        status: error.status,
        message: customMessage || error.message,
      })
    } else {
      resetErrorState()
    }
  }

  return {
    globalState,
    setGlobalState,
    isMountReady,
    toggleMountReady,
    isLoading,
    toggleLoading,
    isProgress,
    toggleProgress,
    isInteractive,
    errorState,
    setErrorState,
    setError,
    resetErrorState,
  }
}
