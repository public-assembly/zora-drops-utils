import { DropsComponents, DropsContractProvider, DropsData } from "@public-assembly/zora-drops-utils"

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Presale Mint / Allowlist</h1>
      <DropsContractProvider collectionAddress="0xb603d89f9f87fda06cd80c4a04ec6dc0440b8f42" networkId="5">
        <DropsComponents.Thumbnail style={{maxWidth: 600}} />
        <DropsComponents.Metadata />
        <DropsComponents.MintButton />
        <DropsData />
      </DropsContractProvider>
      <hr />
      <DropsContractProvider collectionAddress="0x213b55e62323f918b3fb45ac02882a885f9b1da3" networkId="5">
        <DropsComponents.Thumbnail style={{maxWidth: 600}} />
        <DropsComponents.Metadata />
        <DropsComponents.MintButton />
        <DropsData />
      </DropsContractProvider>
    </section>
  )
}

export default Page
