/* @ts-ignore */
import * as React from 'react'
import { useDropsContractProvider } from './../context/DropsContractProvider'

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
