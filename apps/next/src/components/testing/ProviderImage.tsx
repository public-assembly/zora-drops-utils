import React from 'react'
import { useDropContextProvider, addIPFSGateway } from '@public-assembly/zora-drops-utils'

export function ProviderImage() {
  const { data } = useDropContextProvider()

  const src = React.useMemo(
    () =>
      data?.editionMetadata?.imageURI
        ? addIPFSGateway(data?.editionMetadata?.imageURI)
        : '',
    [data]
  )

  return (
    <div style={{ width: 300, height: 300 }} className="relative">
      <img
        src={src}
        alt={data?.editionMetadata?.imageURI}
        className="object-cover inset-0 absolute"
      />
    </div>
  )
}
