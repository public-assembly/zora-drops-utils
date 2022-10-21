/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

/* TODO: This could be cleaner */
export function SalesTiming({
  mintStartLabel = 'Minting Starts:',
  mintEndLabel = 'Minting Ends:',
}: {
  mintStartLabel?: string
  mintEndLabel?: string
}) {
  const { mintStatus } = useDropsContractProvider()
  if (mintStatus?.isEnded) return null
  return (
    <p className={`drops-ui__sales-info--sales-timing`}>
      <span className="drops-ui__sales-info--title">{mintStartLabel}&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{mintStatus?.startDate?.pretty}</span>
      {!mintStatus?.endDate?.pretty ? null : (
        <>
          <span className="drops-ui__sales-info--title">{mintEndLabel}&nbsp;</span>
          <span className="drops-ui__sales-info--copy">
            {JSON.stringify(mintStatus?.endDate, null, 2)}
          </span>
        </>
      )}
    </p>
  )
}
