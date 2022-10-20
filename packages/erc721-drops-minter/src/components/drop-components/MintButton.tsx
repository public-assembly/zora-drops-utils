import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'

export function MintButton({ ...props }) {
  const { mintQuantity, errors, balance, purchase } = useDropsContractProvider()

  const cannotMint = React.useMemo(
    () => errors?.insufficientFunds || balance?.walletLimit,
    [errors, balance, errors?.insufficientFunds, balance?.walletLimit]
  )

  return (
    <div className={`drops-ui__mint-button--component`} {...props}>
      <button
        onClick={purchase}
        className={`
          drops-ui__mint-button--button border-1 w-full border px-2 py-3
          ${cannotMint ? 'drops-ui__mint-button--disabled pointer-events-none' : ''}
          `}>
        {!cannotMint ? (
          <span className="drops-ui__mint-button--label">
            Purchase {mintQuantity?.name} NFT
            {`${mintQuantity?.queryValue > 1 || balance?.walletBalance === 0 ? 's' : ''}`}
          </span>
        ) : (
          <span className="drops-ui__mint-button--label drops-ui__mint-button--label-alert">
            {errors?.insufficientFunds ? 'Insufficient Funds' : ''}
            {balance?.walletLimit ? 'You have minted the maximum amount per wallet.' : ''}
          </span>
        )}
      </button>
    </div>
  )
}
