import React from 'react'
import { useAllowlistEntry } from '../../hooks/useAllowlistEntry'
import { useDropsContractProvider } from './../../context'
import { useAccount } from 'wagmi'

interface MintButtonProps extends React.HTMLAttributes<HTMLElement> {
  mintCta?: string
  presaleMintCta?: string
  presaleCannotMintCta?: string
  insufficientFundsCta?: string
  mintCapCta?: string
  presaleMintCapCta?: string
  tokenDescriptor?: string
  saleOverCta?: string
  saleSoldOutCta?: string
  appendQuantity?: boolean
  useSecondaryMarketLink?: boolean
  mintButtonCallback?: () => void
}

export function MintButton({
  mintCta,
  presaleMintCta,
  insufficientFundsCta = 'Insufficient Funds',
  mintCapCta = 'You have minted the maximum amount per wallet.',
  presaleMintCapCta = 'You have reached the maximum amount of presale mints.',
  presaleCannotMintCta,
  tokenDescriptor = 'NFT',
  saleOverCta = 'The sale is now over.',
  saleSoldOutCta = 'Sold out.',
  appendQuantity = false,
  useSecondaryMarketLink = false,
  mintButtonCallback = () => {},
  ...props
}: MintButtonProps) {
  const { address } = useAccount()

  const {
    mintQuantity,
    collectionAddress,
    networkId,
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
    () => `${tokenDescriptor}${mintQuantity?.queryValue > 1 ? 's' : ''}`,
    [mintQuantity?.queryValue, balance?.walletBalance]
  )

  const mintCtaCopy = React.useMemo(
    () => (!mintCta ? `Purchase ${mintQuantity?.name} ${quantity}` : mintCta),
    [mintQuantity, mintQuantity?.name, quantity]
  )

  const presaleMintCtaCopy = React.useMemo(
    () => (!mintCta ? `Mint presale ${mintQuantity?.name} ${quantity}` : mintCta),
    [mintQuantity, mintQuantity?.name, quantity]
  )

  const presaleCannotMintCtaCopy = React.useMemo(
    () =>
      !presaleCannotMintCta
        ? `Public sale starts: ${saleStatus?.startDateFull?.pretty}`
        : presaleCannotMintCta,
    [saleStatus, saleStatus?.startDateFull?.pretty]
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

  const SecondaryMarket = () => (
    <p className="drops-ui__mint-button--sale-over grid">
      <span>There may be NFTs for sale on the secondary market.</span>
      <a
        href={`https://market.zora.co/collections/${collectionAddress}`}
        target="_blank"
        rel="noreferrer"
        className="underline">
        View on Zora Marketplace
      </a>
    </p>
  )

  if (saleStatus?.isSoldOut && !saleStatus?.saleIsFinished) {
    return (
      <div className={`drops-ui__mint-button--component`} {...props}>
        <div className="flex flex-col gap-2">
          <p className="drops-ui__mint-button--sold-out">{saleSoldOutCta}</p>
          {networkId === '1' && useSecondaryMarketLink && <SecondaryMarket />}
        </div>
      </div>
    )
  }

  if (
    !saleStatus?.saleIsActive &&
    !saleStatus?.presaleIsActive &&
    saleStatus?.saleIsFinished
  ) {
    return (
      <div className={`drops-ui__mint-button--component`} {...props}>
        <div className="flex flex-col gap-2">
          <p className="drops-ui__mint-button--sale-over">{saleOverCta}</p>
          {networkId === '1' && useSecondaryMarketLink && <SecondaryMarket />}
        </div>
      </div>
    )
  }

  return (
    <div className={`drops-ui__mint-button--component`} {...props}>
      {!saleStatus?.saleIsActive && saleStatus?.presaleIsActive && (
        <>
          {accessAllowed ? (
            <button
              className={`
                drops-ui__mint-button--button border-1 w-full border px-2 py-3
                ${cannotMint ? 'drops-ui__mint-button--disabled pointer-events-none' : ''}
              `}
              onClick={handlePresaleMintCall}>
              {!cannotMint ? (
                <span className="drops-ui__mint-button--label">
                  {presaleMintCtaCopy}
                  <>{appendQuantity && quantity}</>
                </span>
              ) : (
                <span className="drops-ui__mint-button--label drops-ui__mint-button--label-alert">
                  {errors?.insufficientFunds ? insufficientFundsCta : ''}
                  {balance?.walletLimit ? presaleMintCapCta : ''}
                </span>
              )}
            </button>
          ) : (
            <span className="drops-ui__mint-button--presale-cannot-mint-cta">
              {presaleCannotMintCtaCopy}
            </span>
          )}
        </>
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
