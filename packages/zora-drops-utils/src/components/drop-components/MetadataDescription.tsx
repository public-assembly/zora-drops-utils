import * as React from 'react'
import { useDropsContractProvider } from '../../context'
import { MetaDataProps } from '../../typings'

export function MetadataDescription({ label = 'Description:', ...props }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()

  const description = React.useMemo(
    () =>
      !collectionData?.editionMetadata?.description
        ? collectionData?.contractURI?.description
        : collectionData?.editionMetadata?.description,
    [collectionData]
  )

  return (
    <p className={`drops-ui__metadata--description`} {...props}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">{description}</span>
    </p>
  )
}
