
'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/reduxStore'
import ResponseLoader from '@/app/_Components/Loaders/responseLoader/ResponseLoader'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const isLoading = useSelector((state: RootState) => state.loaderStore.isLoading)

  return (
    <>
      {isLoading && <ResponseLoader />}
      {children}
    </>
  )
}
