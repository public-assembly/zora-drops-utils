import { DropsMinter } from '@public-assembly/erc721-drops-minter'
import { SimpleMint } from '../components/SimpleMint'

const TEST_MINT_CONTRACTS = [
  '0xE3d8572a5B1e47cD87A6222A5F989332E88DeA69',
  '0x47191cb94c0b6925db9f15e000cf8e3e8864fc9b',
]

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Nextjs App</h1>
      <SimpleMint />
      {TEST_MINT_CONTRACTS.map((edition: any) =>
        <DropsMinter key={edition} collectionAddress={edition} />
      )}
    </section>
  )
}

export default Page
