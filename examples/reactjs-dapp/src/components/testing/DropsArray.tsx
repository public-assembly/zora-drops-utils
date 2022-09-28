import { useSWRDropsArray } from "@public-assembly/zora-drops-utils/src/hooks"
import { RawDisplayer } from "../RawDisplayer"

export function DropsArray({contracts = []}: {contracts: string[]} ) {
  const { data } = useSWRDropsArray({ contractAddresses: contracts })
  
  return (
    <div><RawDisplayer data={data} /></div>
  )
}