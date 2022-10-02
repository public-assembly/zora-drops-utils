import React from 'react'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'

export function MintButton({ ...props }) {
  const {
    mintQuantity,
    errors: { insufficientFunds },
    balance: { walletBalance, walletLimit },
    purchase,
  } = useDropsContractProvider()

  const cannotMint = React.useMemo(
    () => insufficientFunds || walletLimit,
    [insufficientFunds, walletLimit]
  )

  return (
    <div className={`drops-ui__mint-button--wrapper`} {...props}>
      <button
        onClick={purchase}
        className={`
          drops-ui__mint-button--button border-1 border
          ${
            cannotMint
              ? 'drops-ui__mint-button--disabled pointer-events-none opacity-30'
              : ''
          }
          `}>
        {!cannotMint ? (
          <span className="drops-ui__mint-button--label">
            Purchase {mintQuantity?.name} NFT
            {`${mintQuantity?.queryValue > 1 || walletBalance === 0 ? 's' : ''}`}
          </span>
        ) : (
          <span className="drops-ui__mint-button--label drops-ui__mint-button--label-alert">
            {insufficientFunds ? 'Insufficient Funds' : ''}
            {walletLimit ? 'You have minted the maximum amount per wallet.' : ''}
          </span>
        )}
      </button>
    </div>
  )
}
