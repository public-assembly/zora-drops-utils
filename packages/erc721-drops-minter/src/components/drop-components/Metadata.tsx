import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'
import { useEnsName } from 'wagmi'

/* TODO: ClassProp & "title" string const */
export function MetadataName() {
  const { collectionData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--name`}>
      <span className="drops-ui__metadata--title">Name:&nbsp;</span>
      <span className="drops-ui__metadata--copy">{collectionData?.name}</span>
    </p>
  )
}

/* TODO: ClassProp & "title" string const */
export function MetadataCreator() {
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
      <span className="drops-ui__metadata--title">Creator:&nbsp;</span>
      <span className="drops-ui__metadata--copy">{ensName ? ensName : creator}</span>
    </p>
  )
}

export function MetadataDescription() {
  const { collectionData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--description`}>
      <span className="drops-ui__metadata--title">Description:&nbsp;</span>
      <span className="drops-ui__metadata--copy">
        {collectionData?.editionMetadata?.description}
      </span>
    </p>
  )
}

export function Metadata({ ...props }) {
  return (
    <div className={`drops-ui__metadata--component`} {...props}>
      <MetadataName />
      <MetadataCreator />
      <MetadataDescription />
    </div>
  )
}
