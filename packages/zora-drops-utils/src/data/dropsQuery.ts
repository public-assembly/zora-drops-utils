import { gql } from 'graphql-request'

export const EDITIONS_STYLE_CONTRACT_METADATA = gql`
  fragment ERC721Fields on ERC721Drop {
    name
    owner
    symbol
    salesConfig {
      publicSalePrice
      publicSaleStart
      publicSaleEnd
    }
    address
    maxSupply
    totalMinted
    editionMetadata {
      imageURI
      animationURI
      contractURI
      description
    }
    creator
  }
`

export const EDITION_QUERY = gql`
  query editionsStyleDropMetadataerc721Drops($collectionAddress: String!) {
    erc721Drop(id: $collectionAddress) {
      ...ERC721Fields
    }
  }
  ${EDITIONS_STYLE_CONTRACT_METADATA}
`
