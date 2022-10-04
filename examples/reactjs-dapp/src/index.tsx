import ReactDOM from 'react-dom/client'
import { App } from './App'
import { DropsMinter } from '@public-assembly/erc721-drops-minter'
import { SimpleMint } from './components/SimpleMint'

const domContainer = document.getElementById('main')
const root = ReactDOM.createRoot(domContainer)

const TEST_MINT_CONTRACTS = [
  '0xb7a791c3b5a0aa833e638250f982ebd29194f02c',
  '0x47191cb94c0b6925db9f15e000cf8e3e8864fc9b',
]

root.render(
  <App>
    <>
      <h1>Just Image and mintbutton using decoupled components</h1>
      <SimpleMint />
      <h1>Map over Full DropsMinter component</h1>
      {TEST_MINT_CONTRACTS.map((edition: any) =>
        <DropsMinter key={edition} collectionAddress={edition} />
      )}
    </>
  </App>
)
