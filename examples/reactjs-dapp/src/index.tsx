import ReactDOM from 'react-dom/client'
import { App } from './App'
import { SimpleMint } from './components/SimpleMint'

const domContainer = document.getElementById('main')
const root = ReactDOM.createRoot(domContainer)

/*
const TEST_MINT_CONTRACTS = [
  '0x915569b4009b75a2228192902dfcd4e897d9bda3',
  '0x47191cb94c0b6925db9f15e000cf8e3e8864fc9b',
]
*/

root.render(
  <App>
    <>
      {/*<CurationTest />*/}
      <h1>Just Image and mintbutton using decoupled components</h1>
      <SimpleMint />
      <h1>Map over Full DropsMinter component</h1>
      {/*TEST_MINT_CONTRACTS.map((edition: any) =>
        <DropsMinter
          key={edition}
          collectionAddress={edition}
          networkId='1'
          customIpfsGateway='zora-prod.mypinata.cloud'
        />
)*/}
    </>
  </App>
)
