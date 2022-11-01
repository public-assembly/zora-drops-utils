/* @ts-ignore */
import * as React from 'react'
import { useDropsContractProvider } from './../context/DropsContractProvider'
import { useAllowlistEntry } from '../hooks/useAllowlistEntry'
import { useAccount } from 'wagmi'

export function DropsData({ data = {} }: { data?: any }) {
  const {
    collectionData,
    mintStatus,
    purchaseLimit,
    inventory,
    balance,
    errors,
    saleStatus,
  } = useDropsContractProvider()

  const { address } = useAccount()

  const { allowlistEntry, accessAllowed } = useAllowlistEntry({
    merkleRoot: saleStatus?.presaleMerkleRoot,
    address: address,
  })

  const dataToRender = React.useMemo(
    () =>
      collectionData
        ? {
            collectionData,
            mintStatus,
            saleStatus,
            purchaseLimit,
            inventory,
            balance,
            errors,
            allowList: {
              allowlistEntry,
              accessAllowed,
            },
          }
        : data,
    [data, collectionData]
  )

  return (
    <div className="raw-displayer relative w-full overflow-x-scroll rounded-xl bg-gray-200 px-5 py-3 text-left">
      <code>
        <pre>{JSON.stringify(dataToRender, null, 2)}</pre>
      </code>
    </div>
  )
}
