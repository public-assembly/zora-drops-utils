import { ConnectButton } from './ConnectButton'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between border-b border-dashed border-gray-200 px-4">
      <Navigation />
      <ConnectButton />
    </header>
  )
}
