import { RawDisplayer } from "./RawDisplayer";
import { useDropsContextProvider } from "@public-assembly/zora-drops-utils";

export function TestProviderConsumer() {
  const { data, error, isLoading, isValidAddress } = useDropsContextProvider()
  return (
    <div className="flex flex-col">
      <h1 className="text-xl">Using Provider:</h1>
      <br />
      {!isLoading ? <RawDisplayer data={{data, error, isValidAddress}} /> : <p>...loading</p>}
    </div>
  )
}