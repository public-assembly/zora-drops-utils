import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'

export function SimpleMintUi() {
  return (
    <div style={{width: 400}}>
      <DropsComponents.Thumbnail />
      <DropsComponents.MintButton />
    </div>
  )
}

export function SimpleMint() {
  return (
    <DropsContractProvider collectionAddress='0xf11915f3dc44519a7217f6b1e0978f29f8a0ed4b'>
      <SimpleMintUi />
      <DropsComponents.Metadata />
      <DropsComponents.VideoRenderer muted autoPlay style={{aspectRatio: '16/9', width: 500}} />
    </DropsContractProvider>
  )
}
