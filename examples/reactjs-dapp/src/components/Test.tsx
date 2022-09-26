import { returnDropEndpoint } from '@public-assembly/zora-drops-utils'

const goreliEndpoint = returnDropEndpoint('5')
const mainnetEndpoint = returnDropEndpoint('1')

export function TestComponent() {
  return (
    <div className="flex flex-col">
      <p>{goreliEndpoint}</p>
      <p>{mainnetEndpoint}</p>
    </div>
  )
}