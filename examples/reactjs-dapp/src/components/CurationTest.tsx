import { useMemo } from 'react'
import { useCurationFunctions } from '@public-assembly/curation-interactions'
import { RawDisplayer } from './RawDisplayer'
import { AddressZero } from '@ethersproject/constants'
import { DropsContextProvider, useDropsContextProvider } from '@public-assembly/zora-drops-utils'

function CurationRender() {
  const { parsedData } = useDropsContextProvider()
  return (
    <RawDisplayer data={parsedData} />
  )
}

export function CurationTest() {
  const { getListingsReturn: playlistData } = useCurationFunctions({
    curationContractAddress: '0x52a64dA96d0A0078bEAD9158198f3881c4FCD066'
  })
  
  const playList = useMemo(() => {
    const curationTargetTypes = {
      '0': 'CURATION_TYPE_GENERIC',
      '1': 'CURATION_TYPE_NFT_CONTRACT',
      '2': 'CURATION_TYPE_CONTRACT',
      '3': 'CURATION_TYPE_CURATION_CONTRACT',
      '4': 'CURATION_TYPE_NFT_ITEM',
      '5': 'CURATION_TYPE_WALLET',
      '6': 'CURATION_TYPE_ZORA_EDITION',
    }

    function removeDuplicates(array: any, key: any) {
      return [
        ...new Map(
          /* @ts-ignore */
          array.map((x) => [key(x), x])
        ).values()
      ]
    }

    function returnCurationType(key: keyof typeof curationTargetTypes) {
      return curationTargetTypes[key]
    }

    if (playlistData) {
      const allData = playlistData.map((entry) => {
        // console.log(entry)
        try {
          return {
            curatedAddress: entry['curatedAddress']?.toLowerCase(),
            curationTargetType: returnCurationType(
              entry['curationTargetType'].toString()
            ),
            hasTokenId: entry['hasTokenId'],
            tokenId: entry['tokenId']?.toString(),
            curator: entry['curator'],
            sortOrder: entry['sortOrder'],
            chainId: entry['chainId']?.toString(),
          }
        } catch (err) {
          console.error(err)
        }
      })
      try {
        const removeZeroAddress = allData.filter(
          (item) => item?.curatedAddress !== AddressZero && item?.curator !== AddressZero
        )
        const uniqeListings = removeDuplicates(
          removeZeroAddress,
          (item: any) => item.curatedAddress
        )
        return uniqeListings as any[]
      } catch (err) {
        console.error(err)
        return []
      }
    } else {
      return []
    }
  }, [playlistData])

  const playListContracts = useMemo(() => {
    if (playList.length) {
      try {
        const contracts = playList.map((item: any) => item?.curatedAddress?.toLowerCase())
        return contracts
      } catch (err) {
        console.error(err)
      }
    } else {
      return []
    }
  }, [playList])

  return (
    <div>
      <DropsContextProvider
        contractAddresses={playListContracts}
        customIpfsGateway="zora-prod.mypinata.cloud"
      >
        <CurationRender />
      </DropsContextProvider>
    </div>
  )
}