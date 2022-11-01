import { DropsComponents, DropsContractProvider, DropsData } from "@public-assembly/zora-drops-utils"

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Presale Mint / Allowlist</h1>
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
