import { DropsContractProvider, DropsComponents, useDropsContractProvider } from '@public-assembly/zora-drops-utils'

export function SimpleMintUi() {

  const {transaction} = useDropsContractProvider();

  console.log("wait data", transaction)

  return (

    <div style={{width: 400}}>
      <DropsComponents.Thumbnail />
      <DropsComponents.MintButton mintCta='MINT THIS SHIT' mintButtonCallback={() => {alert('prop callback in mint button')}}/>
      <DropsComponents.TotalPrice />
      <DropsComponents.TxStatus />
      <div>
        {"wait for txn sent loading: " + JSON.stringify(transaction.purchaseLoading)}
      </div>
      <div>
        {"wait for txn loading: " + JSON.stringify(transaction.purchaseWaitLoading)}
      </div>
    </div>
  )
}

export function SimpleMint() {

  return (
    <DropsContractProvider networkId='5' collectionAddress='0xb6fa203230ab041dc7433c315871cf551f776070' onMintCallback={() => {alert('mint callback')}} onSuccessCallback={() => alert('mint success')}>
      <DropsComponents.EtherscanLink label={false} linkType='address' truncateAddress/>
      <SimpleMintUi />
      <DropsComponents.Metadata />
      <DropsComponents.Inventory />
      <DropsComponents.VideoRenderer muted autoPlay style={{aspectRatio: '16/9', width: 500}} />
    </DropsContractProvider>
  )
}
