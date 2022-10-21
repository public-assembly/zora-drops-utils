import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'

export function SimpleMintUi() {
  return (
    <div style={{width: 400}}>
      <DropsComponents.Thumbnail />
      <DropsComponents.MintButton mintCta='MINT THIS SHIT' />
      <DropsComponents.TotalPrice />
    </div>
  )
}

export function SimpleMint() {
  return (
    <DropsContractProvider collectionAddress='0xb6fa203230ab041dc7433c315871cf551f776070'>
      <DropsComponents.EtherscanLink label={false} linkType='address' truncateAddress/>
      <SimpleMintUi />
      <DropsComponents.Metadata />
      <DropsComponents.Inventory />
      <DropsComponents.VideoRenderer muted autoPlay style={{aspectRatio: '16/9', width: 500}} />
    </DropsContractProvider>
  )
}
