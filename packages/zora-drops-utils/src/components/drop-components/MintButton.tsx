import React from 'react'
import { useDropsContractProvider } from './../../context'

export function MintButton({
  mintCta,
  insufficientFundsCta = 'Insufficient Funds',
  mintCapCta = 'You have minted the maximum amount per wallet.',
  tokenDescriptor = 'NFT',
  appendQuantity = false,
  mintButtonCallback = () => {},
  ...props
}: {
  mintCta?: string
  insufficientFundsCta?: string
  mintCapCta?: string
  tokenDescriptor?: string
  appendQuantity?: boolean
  mintButtonCallback?: () => void
}) {
  const { mintQuantity, errors, balance, purchase, onMintCallback } =
    useDropsContractProvider()

  const cannotMint = React.useMemo(
    () => errors?.insufficientFunds || balance?.walletLimit,
    [errors, balance, errors?.insufficientFunds, balance?.walletLimit]
  )

  const quantity = React.useMemo(
    () =>
      `${tokenDescriptor}${
        mintQuantity?.queryValue > 1 || balance?.walletBalance === 0 ? 's' : ''
      }`,
    []
  )

  const mintCtaCopy = React.useMemo(
    () => (!mintCta ? `Purchase ${mintQuantity?.name} ${quantity}` : mintCta),
    [mintQuantity, mintQuantity?.name, quantity]
  )

  const handleMintCall = React.useCallback(() => {
    purchase()
    onMintCallback()
    mintButtonCallback()
  }, [purchase, onMintCallback, mintButtonCallback])

  return (
    <div className={`drops-ui__mint-button--component`} {...props}>
      <button
        onClick={handleMintCall}
        className={`
          drops-ui__mint-button--button border-1 w-full border px-2 py-3
          ${cannotMint ? 'drops-ui__mint-button--disabled pointer-events-none' : ''}
        `}>
        {!cannotMint ? (
          <span className="drops-ui__mint-button--label">
            {mintCtaCopy}
            <>{appendQuantity && quantity}</>
          </span>
        ) : (
          <span className="drops-ui__mint-button--label drops-ui__mint-button--label-alert">
            {errors?.insufficientFunds ? insufficientFundsCta : ''}
            {balance?.walletLimit ? mintCapCta : ''}
          </span>
        )}
      </button>
    </div>
  )
}
