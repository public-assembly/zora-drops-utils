import React from 'react'
import { useDropsContractProvider } from './../../context'
import { addIPFSGateway } from './../../lib'

export function Thumbnail({ ...props }) {
  const { collectionData: data } = useDropsContractProvider()

  const src = React.useMemo(
    () =>
      data?.editionMetadata?.imageURI
        ? addIPFSGateway(data?.editionMetadata?.imageURI)
        : '',
    [data, data?.editionMetadata?.imageURI]
  )

  return (
    <div
      className={`drops-ui__thumbnail--component relative aspect-square w-full overflow-hidden`}
      {...props}>
      <img
        className={`drops-ui__thumbnail--image absolute inset-0 object-cover`}
        src={src}
      />
    </div>
  )
}
