import { useRef, useEffect, EffectCallback, DependencyList } from 'react'

// 初回の実行がスキップされるuseEffect
const useDidUpdateEffect = (fn: EffectCallback, deps: DependencyList) => {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      fn()
    } else {
      didMountRef.current = true
    }
  }, deps)
}

// 初回のみ実行されるuseEffect
const useOnceUpdateEffect = (
  fn: EffectCallback,
  deps: DependencyList,
  isUpdate: boolean = true,
) => {
  const didMountRef = useRef(false)
  useDidUpdateEffect(() => {
    if (!didMountRef.current && isUpdate) {
      didMountRef.current = true
      fn()
    }
  }, deps)
}
export { useDidUpdateEffect, useOnceUpdateEffect }
