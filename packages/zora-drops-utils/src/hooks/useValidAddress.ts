import React from 'react'
import { isAddress } from 'ethers/lib/utils'

export function useValidAddress(collectionAddress: string) {
  const isValidAddress = React.useMemo(
    () => isAddress(collectionAddress as string),
    [collectionAddress]
  )
  return isValidAddress
}
