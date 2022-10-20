import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '../../lib'
import { MetaDataProps } from '../../types'

/* TODO: ClassProp & "title" string const */
export function MetadataName({ label = 'Name:', ...props }: MetaDataProps) {
  const { parsedData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--name`} {...props}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">{parsedData?.name}</span>
    </p>
  )
}

/* TODO: ClassProp & "title" string const */
export function MetadataCreator({ label = 'Creator:', ...props }: MetaDataProps) {
  const { parsedData } = useDropsContractProvider()
  const { data: ensName } = useEnsName({
    address: parsedData?.creator,
  })
  const creator = React.useMemo(
    () => parsedData?.creator && parsedData?.creator,
    [parsedData]
  )
  return (
    <p className={`drops-ui__metadata--creator`} {...props}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">
        {ensName ? ensName : shortenAddress(creator)}
      </span>
    </p>
  )
}

export function MetadataDescription({ label = 'Description:', ...props }: MetaDataProps) {
  const { parsedData, collectionData } = useDropsContractProvider()
  console.log('parsedData', parsedData, collectionData)
  return (
    <p className={`drops-ui__metadata--description`} {...props}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">
        {parsedData?.editionMetadata?.description}
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
