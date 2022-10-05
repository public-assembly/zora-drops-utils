import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '../../lib'
import { MetaDataProps } from '../../types'

/* TODO: ClassProp & "title" string const */
export function MetadataName({ label = 'Name:' }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--name`}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">{collectionData?.name}</span>
    </p>
  )
}

/* TODO: ClassProp & "title" string const */
export function MetadataCreator({ label = 'Creator:' }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()
  const { data: ensName } = useEnsName({
    address: collectionData?.creator,
  })
  const creator = React.useMemo(
    () => collectionData?.creator && collectionData?.creator,
    [collectionData]
  )
  return (
    <p className={`drops-ui__metadata--creator`}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">
        {ensName ? ensName : shortenAddress(creator)}
      </span>
    </p>
  )
}

export function MetadataDescription({ label = 'Creator:' }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--description`}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">
        {collectionData?.editionMetadata?.description}
      </span>
    </p>
  )
}

export function Metadata({ useLabels, ...props }: { useLabels?: boolean }) {
  return (
    <div className={`drops-ui__metadata--component`} {...props}>
      <MetadataName label={useLabels} />
      <MetadataCreator label={useLabels} />
      <MetadataDescription label={useLabels} />
    </div>
  )
}
