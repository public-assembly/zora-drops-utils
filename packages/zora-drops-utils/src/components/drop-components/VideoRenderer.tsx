import React from 'react'
import { useDropsContractProvider } from './../../context'
import { addIPFSGateway } from './../../lib'

export interface VideoRendererProps extends React.VideoHTMLAttributes<HTMLElement> {}

export const VideoRenderer = React.forwardRef<HTMLVideoElement, VideoRendererProps>(
  (props, ref) => {
    const { collectionData: data } = useDropsContractProvider()
    const src = React.useMemo(
      () =>
        data?.editionMetadata?.animationURI
          ? addIPFSGateway(data?.editionMetadata?.animationURI)
          : '',
      [data, data?.editionMetadata?.animationURI]
    )

    return <video ref={ref} className="drops-ui__video-renderer" {...props} src={src} />
  }
)
