import React from 'react'
import {
  useDropsContractProvider,
  addIPFSGateway,
} from '@public-assembly/zora-drops-utils'

interface AudioRendererProps extends React.AudioHTMLAttributes<HTMLElement> {}

export const AudioRenderer = React.forwardRef<HTMLAudioElement, AudioRendererProps>(
  (props, ref) => {
    const { collectionData: data } = useDropsContractProvider()
    const src = React.useMemo(
      () =>
        data?.editionMetadata?.animationURI
          ? addIPFSGateway(data?.editionMetadata?.animationURI)
          : '',
      [data, data?.editionMetadata?.animationURI]
    )

    return <audio ref={ref} className="drops-ui__audio-renderer" {...props} src={src} />
  }
)
