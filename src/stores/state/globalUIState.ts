import { atom, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { GlobalUI } from './types'

// initialize
const globalUIStateAtom = atom<GlobalUI>({})
const isMobileAtom = atom<boolean>(true)

export const useGlobalUIState = () => {
  useHydrateAtoms([[isMobileAtom, true]])
  const [value, setValue] = useAtom(globalUIStateAtom)

  return { value, setValue }
}
