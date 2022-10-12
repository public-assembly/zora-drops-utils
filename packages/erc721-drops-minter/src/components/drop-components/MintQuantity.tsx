/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'

export function MintQuantity({ ...props }) {
  const {
    mintQuantity,
    errors: { insufficientFunds },
    purchaseLimit: { maxAmount },
    balance: { walletBalance },
    setMintQuantity,
  } = useDropsContractProvider()

  const setMaxAmount = React.useMemo(() => {
    if (typeof maxAmount === 'number') {
      return maxAmount - Number(walletBalance)
    } else {
      return Number.MAX_SAFE_INTEGER
    }
  }, [maxAmount, walletBalance])

  return (
    <div className={`drops-ui__mint-quantity--component`} {...props}>
      <input
        type="number"
        name="mint-quantity"
        step="1"
        min="1"
        max={setMaxAmount}
        value={mintQuantity?.name}
        onChange={setMintQuantity}
        className={`
          drops-ui__mint-quantity--input form-input border-1 border px-4 py-3
          ${
            insufficientFunds
              ? 'drops-ui__mint-quantity--input-disabled pointer-events-none opacity-30'
              : ''
          }
        `}
      />
    </div>
  )
}
