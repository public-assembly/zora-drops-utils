import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'

export function MintQuantity({ ...props }) {
  const {
    mintQuantity,
    errors: { insufficientFunds },
    purchaseLimit: { maxAmount },
    balance: { walletBalance },
    setMintQuantity,
  } = useDropsContractProvider()

  return (
    <div className={`drops-ui__mint-quantity--wrapper`} {...props}>
      <input
        type="number"
        name="mint-quantity"
        step="1"
        min="1"
        max={maxAmount - Number(walletBalance)}
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
