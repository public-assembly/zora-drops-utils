import { DropsContractProvider, DropsComponents } from '@public-assembly/zora-drops-utils'

export function SimpleMintUi() {
  return (
    <div style={{width: 400}}>
      <DropsComponents.Thumbnail />
      <DropsComponents.MintButton mintCta='MINT THIS SHIT' mintButtonCallback={() => {alert('prop callback in mint button')}}/>
      <DropsComponents.TotalPrice />
      <DropsComponents.TxStatus />
    </div>
  )
}

export function SimpleMint() {
  return (
    <DropsContractProvider collectionAddress='0xb6fa203230ab041dc7433c315871cf551f776070' onMintCallback={() => {alert('mint callback')}} onSuccessCallback={() => alert('mint success')}>
      <DropsComponents.EtherscanLink label={false} linkType='address' truncateAddress/>
      <SimpleMintUi />
      <DropsComponents.Metadata />
      <DropsComponents.Inventory />
      <DropsComponents.VideoRenderer muted autoPlay style={{aspectRatio: '16/9', width: 500}} />
    </DropsContractProvider>
  )
}
