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
    <DropsContractProvider collectionAddress='0x915569b4009b75a2228192902dfcd4e897d9bda3' customIpfsGateway='zora-prod.mypinata.cloud'>
      <DropsComponents.EtherscanLink label={false} linkType='address' truncateAddress/>
      <SimpleMintUi />
      <DropsComponents.Metadata />
      <DropsComponents.Inventory />
      <DropsComponents.VideoRenderer muted autoPlay style={{aspectRatio: '16/9', width: 500}} />
    </DropsContractProvider>
  )
}
