/* @ts-ignore */
import React from 'react'
import { useDropsContractProvider } from './../../context'
import { shortenAddress } from '../../lib'

export interface EtherscanLinkProps extends React.LinkHTMLAttributes<HTMLElement> {
  label?: string | boolean
  truncateAddress?: boolean
  linkType?: 'address' | 'token'
}

export function EtherscanLink({
  label = 'Etherscan:',
  truncateAddress = false,
  linkType = 'token',
  ...props
}: EtherscanLinkProps) {
  const { collectionAddress, networkId } = useDropsContractProvider()
  return (
    <a
      href={`https://${
        networkId === '5' ? 'goerli' : ''
      }/etherscan.io/${linkType}/${collectionAddress}`}
      className={`drops-ui__etherscan-link--collection-address`}
      target="_blank"
      rel="noreferrer"
      {...props}>
      {label ? (
        <span className="drops-ui____etherscan-link--label">{label}&nbsp;</span>
      ) : null}
      <span className="drops-ui____etherscan-link--copy">
        {truncateAddress ? shortenAddress(collectionAddress) : collectionAddress}
      </span>
    </a>
  )
}
