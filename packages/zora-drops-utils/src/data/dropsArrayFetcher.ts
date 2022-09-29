import { dropsFetcher } from './dropsFetcher'
import { EDITION_QUERY } from './dropsQuery'
import { DropsArrayRequestProps } from '../typings/requestTypes'

export async function dropsArrayFetcher({
  contractAddresses,
  networkId = '1',
}: DropsArrayRequestProps) {
  try {
    const editions = await Promise.all(
      contractAddresses.map(async (contractAddress) => {
        const metadata = await dropsFetcher(
          networkId,
          contractAddress.toLowerCase(),
          EDITION_QUERY
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
