import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const storageKey = 'LOCAL_STORAGE_KEY'
const initValue = null
// #TEMPORARY login token
export const storageNameAtom = atomWithStorage<string | null>(storageKey, initValue)

export const useLoginAuthSate = () => {
  const [storageName, setStorageName] = useAtom(storageNameAtom)

  const handleStorageName = (value: string) => {
    setStorageName(value)
  }

  return { storageName, handleStorageName }
}
