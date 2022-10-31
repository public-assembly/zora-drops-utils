import { DropsComponents, DropsContractProvider, DropsData } from "@public-assembly/zora-drops-utils"

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Presale Mint / Allowlist</h1>
      <DropsContractProvider collectionAddress="0xa3ba36ce1af5fa6bb8ab35a61c8ae72293b38b32" networkId="5">
        <DropsComponents.Thumbnail style={{maxWidth: 600}} />
        <DropsComponents.Metadata />
        <DropsData />
      </DropsContractProvider>
    </section>
  )
}

export default Page
