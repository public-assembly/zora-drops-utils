import { DropsComponents, DropsContractProvider, DropsData } from "@public-assembly/zora-drops-utils"

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Render Drops Style Contract Metadata</h1>
      <DropsContractProvider collectionAddress="0xb603d89f9f87fda06cd80c4a04ec6dc0440b8f42" networkId="5">
        <DropsComponents.Thumbnail style={{maxWidth: 600}} />
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
