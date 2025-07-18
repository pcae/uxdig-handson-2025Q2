'use client'
import { useRouter } from 'next/navigation'

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter()

  return (
    <div className='flex items-center justify-center bg-white dark:border-neutral-800 dark:bg-black h-screen w-full'>
      エラーが発生しました
      <button
          className='px-4 py-1 h-[40px] text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-900 border border-transparent rounded-md transition-all hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#222]'
          data-rounded='rounded-md'
          data-primary='indigo-600'
          onClick={() => router.back()}
        >
          戻る
        </button>
    </div>
  )
}
