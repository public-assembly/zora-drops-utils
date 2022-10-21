/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from '../../context'
import { MetaDataProps } from '../../typings'

/* TODO: ClassProp & "title" string const */
export function MetadataName({ label = 'Name:', ...props }: MetaDataProps) {
  const { collectionData } = useDropsContractProvider()
  return (
    <p className={`drops-ui__metadata--name`} {...props}>
      {label ? <span className="drops-ui__metadata--label">{label}&nbsp;</span> : null}
      <span className="drops-ui__metadata--copy">{collectionData?.name}</span>
    </p>
  )
}
