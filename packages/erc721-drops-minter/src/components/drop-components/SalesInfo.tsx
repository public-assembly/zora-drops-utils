import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'

/* TODO: add etherscan link */
export function CollectionAddress() {
  const { collectionAddress } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--collection-address`}>
      <span className="drops-ui__sales-info--title">Collection address:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{collectionAddress}</span>
    </p>
  )
}

export function MaxQuantity() {
  const {
    purchaseLimit: { prettyMaxAmount },
  } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--max-quantity`}>
      <span className="drops-ui__sales-info--title">Maximum per address:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{prettyMaxAmount}</span>
    </p>
  )
}

export function Inventory() {
  const {
    inventory: { prettyInventory },
  } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--inventory`}>
      <span className="drops-ui__sales-info--title">NFTs sold:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{prettyInventory}</span>
    </p>
  )
}

/* TODO: make symbol prop */
export function TotalPrice() {
  const { totalPrice } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--total-price`}>
      <span className="drops-ui__sales-info--title">Total price:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{totalPrice?.pretty}Ξ</span>
    </p>
  )
}

/* TODO: This could be cleaner */
export function SalesTiming() {
  const {
    mintStatus: { isEnded, startDate, endDate },
  } = useDropsContractProvider()
  if (isEnded) return null
  return (
    <p className={`drops-ui__sales-info--sales-timing`}>
      <span className="drops-ui__sales-info--title">Minting Starts:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">{startDate?.pretty}</span>
      {!endDate?.pretty ? null : (
        <>
          <span className="drops-ui__sales-info--title">Minting Ends:&nbsp;</span>
          <span className="drops-ui__sales-info--copy">
            {JSON.stringify(endDate, null, 2)}
          </span>
        </>
      )}
    </p>
  )
}

export function SaleActiveAlert() {
  const {
    mintStatus: { isActive },
  } = useDropsContractProvider()
  if (!isActive) return null
  return (
    <p className={`drops-ui__sales-info--sale-active-alert`}>
      <span className="drops-ui__sales-info--alert">Minting Active</span>
    </p>
  )
}

export function SaleEndedAlert() {
  const {
    mintStatus: { isEnded },
  } = useDropsContractProvider()
  if (!isEnded) return null
  return (
    <p className={`drops-ui__sales-info--sale-ended-alert`}>
      <span className="drops-ui__sales-info--alert">Sale has ended</span>
    </p>
  )
}

export function WalletBalance() {
  const {
    balance: { walletBalance },
  } = useDropsContractProvider()
  return (
    <p className={`drops-ui__sales-info--balance`}>
      <span className="drops-ui__sales-info--title">You Own:&nbsp;</span>
      <span className="drops-ui__sales-info--copy">
        {walletBalance}&nbsp;NFT{`${walletBalance > 1 || walletBalance === 0 ? 's' : ''}`}
      </span>
    </p>
  )
}

export function SalesInfo() {
  return (
    <>
      <CollectionAddress />
      <MaxQuantity />
      <Inventory />
      <TotalPrice />
      <SalesTiming />
      <SaleActiveAlert />
      <SaleEndedAlert />
      <WalletBalance />
    </>
  )
}
