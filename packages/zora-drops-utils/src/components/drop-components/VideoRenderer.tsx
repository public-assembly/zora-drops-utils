import React from 'react'
import { useDropsContractProvider } from './../../context'
import { addIPFSGateway } from './../../lib'

export interface VideoRendererProps extends React.VideoHTMLAttributes<HTMLElement> {}

export const VideoRenderer = React.forwardRef<HTMLVideoElement, VideoRendererProps>(
  (props, ref) => {
    const { collectionData, ipfsGateway } = useDropsContractProvider()
    const src = React.useMemo(
      () =>
        collectionData?.editionMetadata?.animationURI
          ? addIPFSGateway(collectionData?.editionMetadata?.animationURI, ipfsGateway)
          : '',
      [collectionData, collectionData?.editionMetadata?.animationURI]
    )

    return <video ref={ref} className="drops-ui__video-renderer" {...props} src={src} />
  }
)
