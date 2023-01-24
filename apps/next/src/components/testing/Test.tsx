import React from 'react'
import {
  returnDropEndpoint,
  DropContextProvider,
  DropsContextProvider,
} from '@public-assembly/zora-drops-utils'
import { RawDisplayer } from '../RawDisplayer'
import { TestProviderConsumer } from './TestProviderConsumer'
import { TestHooks } from './TestingHooks'
import { DropsArray } from './DropsArray'
import { TestArrayProviderConsumer } from './TestArrayProviderConsumer'
import { DropMintTest } from './DropMintTest'

const goreliEndpoint = returnDropEndpoint('5')
const mainnetEndpoint = returnDropEndpoint('1')

const TEST_CONTRACTS = [
  '0xb7a791c3b5a0aa833e638250f982ebd29194f02c',
  '0x674fb9ed86b847db9aee0a19e9055d5d2c0e6cc4',
  '0x2f0146ca3c62a33177959565ae9df2f86cf01551',
]

const TEST_MINT_CONTRACTS = [
  '0xb7a791c3b5a0aa833e638250f982ebd29194f02c',
  '0x674fb9ed86b847db9aee0a19e9055d5d2c0e6cc4',
]

const tracks = [
  '0x78Fb0b8D4502ae69A61C0d0321141629553472bd',
  '0x973aEE1e38aAfAfB8A3c817117Cf2aD43aB90ef7',
  '0x6bdc3155dd9535f002cD539E664c408eC42C060f',
  '0x3e28d99c9DFF6F183E04a47fF82BDF83D6D07FBE',
  '0x423E2e4687a368b970c28ceEc20448048B3eC8ab',
  '0x1495F8419C544071717375518b9DfF1975d907FA',
  '0xC989AC6D12eC65650DfFaAD88CFB4BDA261Cc7FB',
  '0x173BF29946b6BeAc8Ceac628bb65b5F8f13B8524',
  '0x6026A17D359A9B721f0709c963aD948dB33F56DD',
  '0x970Eeca75562Ac20080459B16EA8aC1c54D6124B',
  '0x092882162387eAEAcE2d2f9D093F4f015eD73690',
  '0x54Dab8d172B408a14fDB7991Ebe243C27c7eF702',
  '0x06064b039C2a2096eFFC638B86f632327e91da0D',
  '0xA1b3920F56ac834b5D0b93B24378e609DA2202Af',
  '0x3AA59b2610ab3A94c52BD840eC753b01F6134bB1',
  '0x40B34C125a79C8deE404091ffB64ba2bD56348ce',
  '0x24271B4B616180e1a42bBEB93C75532EA34FD077',
  '0x4b29bBc353afa48c9D21716a3C051deB6a8145bD',
  '0x06CE5D865251d29b0957DF602111970Eb161eC6c',
  '0x14214694847bA90Da2E9b08B6dE397bd06d5a626',
  '0x676777D784EbCc9D3Ff3e28ce73757864a8333B4',
]

export function TestComponent() {
  const [address, setAddress] = React.useState(TEST_CONTRACTS[0])
  const handleSetAddress = React.useCallback(
    (event: any) => {
      setAddress(event?.target.value)
    },
    [setAddress]
  )

  return (
    <>
      {TEST_MINT_CONTRACTS.map((address) => (
        <DropMintTest key={address} collectionAddress={address} />
      ))}
      <div className="flex flex-col p-4 border border-solid border-1 rounded-xl">
        <h1 className="text-xl">Endpoints:</h1>
        <br />
        <RawDisplayer
          data={{
            mainnet: mainnetEndpoint,
            goerli: goreliEndpoint,
          }}
        />
        <br />
        <h1 className="text-xl">Array of Drops:</h1>
        <br />
        <DropsArray contracts={tracks} />
        <br />
        <hr className="border border-b-0 border-dashed" />
        <br />
        <DropsContextProvider contractAddresses={tracks} refreshInterval={0}>
          <TestArrayProviderConsumer />
        </DropsContextProvider>
        <br />
        <hr className="border border-b-0 border-dashed" />
        <br />
        <h1 className="text-xl pb-2">Select A Contract:</h1>
        <select
          className="border border-solid border-1 p-2 border-black rounded-md"
          onChange={handleSetAddress}
          value={address}>
          {TEST_CONTRACTS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <br />
        <hr className="border border-b-0 border-dashed" />
        <br />
        <DropContextProvider contractAddress={address}>
          <TestProviderConsumer />
        </DropContextProvider>
        <br />
        <hr className="border border-b-0 border-dashed" />
        <br />
        <TestHooks contractAddress={address} />
        <br />
        <br />
        <br />
      </div>
    </>
  )
}
