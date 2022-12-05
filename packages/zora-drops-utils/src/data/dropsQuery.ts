import { gql } from 'graphql-request'

export const ERC721_DROPS_CONTRACT_METADATA = gql`
  fragment ERC721Fields on ERC721Drop {
    name
    owner
    symbol
    contractURI
    salesConfig {
      id
      publicSalePrice
      maxSalePurchasePerAddress
      publicSaleStart
      publicSaleEnd
      presaleStart
      presaleEnd
      presaleMerkleRoot
    }
    address
    maxSupply
    totalMinted
    editionMetadata {
      imageURI
      animationURI
      description
    }
    creator
  }
`

export const DROPS_QUERY = gql`
  query editionsStyleDropMetadataerc721Drops($collectionAddress: String!) {
    erc721Drop(id: $collectionAddress) {
      ...ERC721Fields
    }
  }
  ${ERC721_DROPS_CONTRACT_METADATA}
`
