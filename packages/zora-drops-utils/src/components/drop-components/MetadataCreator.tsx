import React from 'react'
import { useEnsName } from 'wagmi'

import { useDropsContractProvider } from '../../context'
import { shortenAddress } from '../../lib'
import { MetaDataProps } from '../../typings'

/* TODO: ClassProp & "title" string const */
export function MetadataCreator({ label = 'Creator:', ...props }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()
  const { data: ensName } = useEnsName({
    address: collectionData?.creator,
  })
  const creator = React.useMemo(
    () => collectionData?.creator && collectionData?.creator,
    [collectionData]
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
