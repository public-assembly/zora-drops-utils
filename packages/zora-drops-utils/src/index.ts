export {
  ERC721_DROPS_CONTRACT_METADATA,
  DROPS_QUERY,
  dropsFetcher,
  dropsArrayFetcher,
} from './data'

export { DROPS_SUBGRAPH_URLS, returnDropEndpoint } from './constants'

export {
  useDrop,
  useSWRDrop,
  useDropsArray,
  useSWRDropsArray,
  useAllowlistEntry,
} from './hooks'

export {
  DropContextProvider,
  useDropContextProvider,
  DropsContextProvider,
  useDropsContextProvider,
  DropsContractProvider,
  useDropsContractProvider,
} from './context'

export { addIPFSGateway } from './lib/addIPFSGateway'

export type {
  DropsRequestProps,
  DropsArrayRequestProps,
  MetaDataProps,
  DropsContractReturnTypes,
  SaleDate,
  DropsContractProps,
  AllowListEntry,
  Networks,
} from './typings'

/**
 * Components
 */

import {
  Metadata,
  MetadataCreator,
  MetadataName,
  MetadataDescription,
  MintButton,
  MintQuantity,
  SalesInfo,
  CollectionAddress,
  MaxQuantity,
  Inventory,
  TotalPrice,
  SalesTiming,
  SaleActiveAlert,
  SaleEndedAlert,
  Thumbnail,
  VideoRenderer,
  AudioRenderer,
  TxStatus,
  TxFeedback,
  EtherscanLink,
} from './components/drop-components'

export const DropsComponents = {
  Metadata,
  MetadataCreator,
  MetadataName,
  MetadataDescription,
  MintButton,
  MintQuantity,
  SalesInfo,
  CollectionAddress,
  MaxQuantity,
  Inventory,
  TotalPrice,
  SalesTiming,
  SaleActiveAlert,
  SaleEndedAlert,
  Thumbnail,
  TxStatus,
  TxFeedback,
  EtherscanLink,
  VideoRenderer,
  AudioRenderer,
}

export { DropsMinter } from './components/DropsMinter'
export { DropsData } from './components/DropsData'
