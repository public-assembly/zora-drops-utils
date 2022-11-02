/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'

export function MintQuantity({ ...props }) {
  const { mintQuantity, errors, purchaseLimit, balance, setMintQuantity } =
    useDropsContractProvider()

  const inputMax = React.useMemo(() => {
    try {
      const max = purchaseLimit?.maxAmount - balance?.walletBalance
      return max.toString()
    } catch (err) {
      console.error(err)
      return 1
    }
  }, [purchaseLimit, balance])

  return (
    <div className={`drops-ui__mint-quantity--component`} {...props}>
      <input
        type="number"
        name="mint-quantity"
        step="1"
        min="1"
        max={inputMax}
        value={mintQuantity?.name}
        onChange={setMintQuantity}
        className={`
          drops-ui__mint-quantity--input form-input border-1 border px-4 py-3
          ${
            errors?.insufficientFunds
              ? 'drops-ui__mint-quantity--input-disabled pointer-events-none opacity-30'
              : ''
          }
        `}
      />
    </div>
  )
}
