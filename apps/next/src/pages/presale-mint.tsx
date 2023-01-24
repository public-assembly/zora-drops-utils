import {
  DropsComponents,
  DropsContractProvider,
  DropsData,
} from '@public-assembly/zora-drops-utils'

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Presale Mint / Allowlist</h1>
      <DropsContractProvider
        collectionAddress="0x213b55e62323f918b3fb45ac02882a885f9b1da3"
        networkId="5">
        <DropsComponents.Thumbnail style={{ maxWidth: 600 }} />
        <DropsComponents.Metadata />
        <div className="flex flex-row gap-2">
          <DropsComponents.MintButton />
          <DropsComponents.MintQuantity />
        </div>
        <DropsComponents.TxStatus />
        <DropsData />
      </DropsContractProvider>
      <hr></hr>
      <DropsContractProvider
        collectionAddress="0xa5c3340d5b27407997beb72eb30b7b234bec6e95"
        networkId="5">
        <DropsComponents.Thumbnail style={{ maxWidth: 600 }} />
        <DropsComponents.Metadata />
        <div className="flex flex-row gap-2">
          <DropsComponents.MintButton />
          <DropsComponents.MintQuantity />
        </div>
        <DropsComponents.TxStatus />
        <DropsData />
      </DropsContractProvider>
    </section>
  )
}

export default Page
