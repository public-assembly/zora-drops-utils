import { DropsMinter } from '@public-assembly/zora-drops-utils'
/*
const TEST_MINT_CONTRACTS = [
  '0xE3d8572a5B1e47cD87A6222A5F989332E88DeA69',
  '0x47191cb94c0b6925db9f15e000cf8e3e8864fc9b',
]
*/

const TESTNET_MINT_CONTRACTS = [
  '0xa3ba36ce1af5fa6bb8ab35a61c8ae72293b38b32',
  '0x83b9f7ddd165e32ebea7da1b54405bf8c16708f7',
  '0x31bed60ae0627575725f4460139f095cd9e4a08b'
]

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Nextjs App</h1>
      <div className="grid grid-cols-3 gap-4">
        {TESTNET_MINT_CONTRACTS.map((edition: any) =>
          <DropsMinter
            key={edition}
            collectionAddress={edition}
            ipfsGateway="zora-prod.mypinata.cloud"
            networkId="5"
          />
        )}
      </div>
    </section>
  )
}

export default Page
