import { dropsFetcher } from './dropsFetcher'
import { DropsArrayRequestProps } from '../typings/requestTypes'

export async function dropsArrayFetcher({
  contractAddresses,
  networkId = '1',
  ipfsGateway,
}: DropsArrayRequestProps & {
  ipfsGateway?: string
}) {
  try {
    const editions = await Promise.all(
      contractAddresses.map(async (contractAddress) => {
        const metadata = await dropsFetcher(
          networkId,
          contractAddress.toLowerCase(),
          ipfsGateway
        )
          .then((res) => {
            return res
          })
          .catch((error) => {
            console.error(error)
          })
        return metadata
      })
    )
    return editions
  } catch (err) {
    return err
  }
}
