/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from '../../context'
import { MetaDataProps } from '../../typings'

export function MetadataDescription({ label = 'Description:', ...props }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--description`} {...props}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">
        {collectionData?.editionMetadata?.description}
      </span>
    </p>
  )
}
