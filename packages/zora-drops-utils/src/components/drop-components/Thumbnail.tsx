import React from 'react'
import { useDropsContractProvider } from './../../context'
import { addIPFSGateway } from './../../lib'

export function Thumbnail({ ...props }) {
  const { collectionData } = useDropsContractProvider()

  const src = React.useMemo(
    () =>
      collectionData?.editionMetadata?.imageURI
        ? addIPFSGateway(collectionData?.editionMetadata?.imageURI)
        : addIPFSGateway(collectionData?.contractURI?.image),
    [collectionData, collectionData?.editionMetadata?.imageURI]
  )

  return (
    <div
      className={`drops-ui__thumbnail--component relative aspect-square w-full overflow-hidden`}
      {...props}>
      <img
        className={`drops-ui__thumbnail--image absolute inset-0 h-full w-full object-cover`}
        src={src}
      />
    </div>
  )
}
