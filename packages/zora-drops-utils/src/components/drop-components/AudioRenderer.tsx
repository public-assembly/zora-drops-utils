import React from 'react'
import { useDropsContractProvider } from './../../context'
import { addIPFSGateway } from './../../lib'

export interface AudioRendererProps extends React.AudioHTMLAttributes<HTMLElement> {}

export const AudioRenderer = React.forwardRef<HTMLAudioElement, AudioRendererProps>(
  (props, ref) => {
    const { collectionData, ipfsGateway } = useDropsContractProvider()
    const src = React.useMemo(
      () =>
        collectionData?.editionMetadata?.animationURI
          ? addIPFSGateway(collectionData?.editionMetadata?.animationURI, ipfsGateway)
          : '',
      [collectionData, collectionData?.editionMetadata?.animationURI]
    )

    return <audio ref={ref} className="drops-ui__audio-renderer" {...props} src={src} />
  }
)
