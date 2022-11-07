import * as React from 'react'
import { HashZero } from '@ethersproject/constants'
import { dateFormat } from '../constants'

export function useSaleStatus({
  collectionData,
  presale = false,
}: {
  collectionData: any
  presale?: boolean
}) {
  const presaleStart = Number(collectionData?.salesConfig?.presaleStart) * 1000
  const presaleEnd = Number(collectionData?.salesConfig?.presaleEnd) * 1000
  const publicSaleStart = Number(collectionData?.salesConfig?.publicSaleStart) * 1000
  const publicSaleEnd = Number(collectionData?.salesConfig?.publicSaleEnd) * 1000

  const startDate = presale ? presaleStart : publicSaleStart
  const endDate = presale ? presaleEnd : publicSaleEnd

  const startDateFull = React.useMemo(() => {
    if (collectionData?.salesConfig?.publicSaleStart) {
      const isoDate = new Date(
        Number(collectionData?.salesConfig?.publicSaleStart) * 1000
      )
      return {
        iso: isoDate,
        unixTime: collectionData?.salesConfig?.publicSaleStart,
        pretty: `${isoDate.toLocaleString(...dateFormat)}`,
      }
    }
  }, [collectionData?.salesConfig?.publicSaleStart])

  const endDateFull = React.useMemo(() => {
    if (collectionData?.salesConfig?.publicSaleEnd) {
      const isoDate = new Date(Number(collectionData?.salesConfig?.publicSaleEnd) * 1000)
      const formattedEndDate = `${isoDate.toLocaleString(...dateFormat)}`
      return {
        iso: isoDate,
        unixTime: collectionData?.salesConfig?.publicSaleEnd,
        pretty: formattedEndDate !== 'Invalid Date' ? formattedEndDate : undefined,
      }
    }
  }, [collectionData?.salesConfig?.publicSaleEnd])

  const presaleStartDateFull = React.useMemo(() => {
    if (collectionData?.salesConfig?.preSaleStart) {
      const isoDate = new Date(Number(collectionData?.salesConfig?.preSaleStart) * 1000)
      return {
        iso: isoDate,
        unixTime: collectionData?.salesConfig?.preSaleStart,
        pretty: `${isoDate.toLocaleString(...dateFormat)}`,
      }
    }
  }, [collectionData?.salesConfig?.preSaleStart])

  const presaleEndDateFull = React.useMemo(() => {
    if (collectionData?.salesConfig?.preSaleEnd) {
      const isoDate = new Date(Number(collectionData?.salesConfig?.preSaleEnd) * 1000)
      const formattedEndDate = `${isoDate.toLocaleString(...dateFormat)}`
      return {
        iso: isoDate,
        unixTime: collectionData?.salesConfig?.preSaleEnd,
        pretty: formattedEndDate !== 'Invalid Date' ? formattedEndDate : undefined,
      }
    }
  }, [collectionData?.salesConfig?.preSaleEnd])

  const isSoldOut =
    collectionData?.maxSupply &&
    collectionData?.totalMinted &&
    Number(collectionData?.totalMinted) >= Number(collectionData?.maxSupply)

  const saleIsActive = startDate <= Date.now() && endDate > Date.now()
  const saleNotStarted = startDate > Date.now()
  const saleIsFinished = endDate < Date.now()

  const publicSaleExists = publicSaleStart + publicSaleEnd > 0
  const presaleExists = presaleStart + presaleEnd > 0

  const merkleRootExists =
    collectionData?.salesConfig?.presaleMerkleRoot !== HashZero.toString()

  const presaleIsActive =
    merkleRootExists && presaleStart <= Date.now() && presaleEnd > Date.now()

  const merkleRoot = merkleRootExists && collectionData?.salesConfig?.presaleMerkleRoot

  return {
    startDate,
    endDate,
    startDateFull,
    endDateFull,
    presaleStartDateFull,
    presaleEndDateFull,
    isSoldOut,
    saleIsActive,
    saleNotStarted,
    saleIsFinished,
    merkleRootExists,
    presaleExists,
    publicSaleExists,
    presaleIsActive,
    presaleMerkleRoot: merkleRoot,
  }
}
