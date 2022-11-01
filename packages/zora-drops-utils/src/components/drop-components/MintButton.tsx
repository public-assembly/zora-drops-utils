import React from 'react'
import { useAllowlistEntry } from '../../hooks/useAllowlistEntry'
import { useDropsContractProvider } from './../../context'
import { useAccount } from 'wagmi'

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
  const { address } = useAccount()

  const {
    mintQuantity,
    errors,
    balance,
    purchase,
    purchasePresale,
    onMintCallback,
    saleStatus,
  } = useDropsContractProvider()

  const cannotMint = React.useMemo(
    () => errors?.insufficientFunds || balance?.walletLimit,
    [errors, balance, errors?.insufficientFunds, balance?.walletLimit]
  )

  const { accessAllowed, allowlistEntry } = useAllowlistEntry({
    merkleRoot: saleStatus?.presaleMerkleRoot,
    address: address,
  })

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

  const handlePresaleMintCall = React.useCallback(() => {
    purchasePresale(mintQuantity?.queryValue, allowlistEntry)
    onMintCallback()
    mintButtonCallback()
  }, [purchasePresale, mintQuantity?.queryValue, allowlistEntry])

  return (
    <div className={`drops-ui__mint-button--component`} {...props}>
      {!saleStatus?.saleIsActive && saleStatus?.presaleIsActive && (
        <div>
          {accessAllowed ? (
            <button
              className={`drops-ui__mint-button--button border-1 w-full border px-2 py-3`}
              onClick={handlePresaleMintCall}>
              <span>Mint Presale</span>
            </button>
          ) : (
            <div>Public sale starts: {saleStatus?.startDateFull?.pretty}</div>
          )}
        </div>
      )}
      {saleStatus?.saleIsActive && !saleStatus?.presaleIsActive && (
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
      )}
    </div>
  )
}
