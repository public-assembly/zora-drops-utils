import React from 'react'
import { returnDropEndpoint, useDropsRequest, useSWRDropsRequest } from '@public-assembly/zora-drops-utils'
import { RawDisplayer } from './RawDisplayer'

const goreliEndpoint = returnDropEndpoint('5')
const mainnetEndpoint = returnDropEndpoint('1')

const TEST_CONTRACTS = [
  '0xb7a791c3b5a0aa833e638250f982ebd29194f02c',
  '0x674fb9ed86b847db9aee0a19e9055d5d2c0e6cc4',
  '0x2f0146ca3c62a33177959565ae9df2f86cf01551',
  '0x2f0146ca3c62a33177959565ae9df2f86cf015',
]

export function TestComponent() {
  const [address, setAddress] = React.useState(TEST_CONTRACTS[0])

  const { data, error, isLoading, isValidAddress } = useDropsRequest({
    contractAddress: address,
    networkId: '1'
  })

  const { data: swrData, error: swrError, isLoading: swrLoading, isValidAddress: swrValid } = useSWRDropsRequest({
    contractAddress: address,
    networkId: '1'
  })

  console.log(isLoading)
  
  const handleSetAddress = React.useCallback((event: any) => {
    setAddress(event?.target.value)
  }, [setAddress])

  return (
    <div className="flex flex-col">
      <h1 className="text-xl">Endpoints:</h1>
      <p>{goreliEndpoint}</p>
      <p>{mainnetEndpoint}</p>
      <br />
      <select
        className="border border-solid border-1 p-2 rounded-md"
        onChange={handleSetAddress}
        value={address}
      >
        {TEST_CONTRACTS.map((value) =>
          <option key={value} value={value}>{value}</option>
        )}
      </select>
      <br />
      <h1 className="text-xl">Simple Request Hook:</h1>
      <br />
      {!isLoading ? <RawDisplayer data={{data, error, isValidAddress}} /> : <p>...loading</p>}
      <br />
      <h1 className="text-xl">SWR Request Hook:</h1>
      <br />
      {!swrLoading ? <RawDisplayer data={{ swrData, swrError, swrValid }} /> : <p>...loading</p>}
      <br />
      <br />
      <br />
    </div>
  )
}