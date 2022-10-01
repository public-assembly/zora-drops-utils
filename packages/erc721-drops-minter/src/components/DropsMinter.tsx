import React from 'react'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import { MintUI } from './MintUi'

export function DropsMinter({
  collectionAddress,
  successCallback,
}: {
  collectionAddress?: string
  successCallback?: () => void
}) {
  const onSuccess = React.useCallback(() => {
    if (successCallback) {
      successCallback()
    }
  }, [])

  if (!collectionAddress) return null

  return (
    <DropsContractProvider
      collectionAddress={collectionAddress}
      onSuccessCallback={onSuccess}>
      <MintUI />
    </DropsContractProvider>
  )
}
