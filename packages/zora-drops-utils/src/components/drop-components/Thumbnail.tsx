import React from 'react'
import { useDropsContractProvider } from './../../context'
import { addIPFSGateway } from './../../lib'

export function Thumbnail({ ...props }) {
  const { collectionData, ipfsGateway } = useDropsContractProvider()

  const src = React.useMemo(
    () =>
      collectionData?.editionMetadata?.imageURI
        ? addIPFSGateway(collectionData?.editionMetadata?.imageURI, ipfsGateway)
        : addIPFSGateway(collectionData?.contractURI?.image, ipfsGateway),
    [
      collectionData,
      collectionData?.editionMetadata?.imageURI,
      collectionData?.contractURI?.image,
    ]
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
