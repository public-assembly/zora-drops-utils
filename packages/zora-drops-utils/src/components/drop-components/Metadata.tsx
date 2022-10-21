/* @ts-ignore */
import React from 'react'
import { MetadataName } from './MetadataName'
import { MetadataCreator } from './MetadataCreator'
import { MetadataDescription } from './MetadataDescription'

export function Metadata({ useLabels, ...props }: { useLabels?: boolean }) {
  return (
    <div className={`drops-ui__metadata--component`} {...props}>
      <MetadataName label={useLabels} />
      <MetadataCreator label={useLabels} />
      <MetadataDescription label={useLabels} />
    </div>
  )
}
