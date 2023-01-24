import assert from 'assert'
import { goerli, mainnet } from 'wagmi/chains'

// Available chains for each environment
const CHAIN_ENVS = {
  mainnet: [mainnet],
  testnet: [goerli],
}

// Ensure chain env is valid
function isValidChainEnv(chainEnv: string): chainEnv is keyof typeof CHAIN_ENVS {
  return chainEnv in CHAIN_ENVS
}

// Assert chain env is set and valid
assert(process.env.NEXT_PUBLIC_CHAIN_ENV, 'NEXT_PUBLIC_CHAIN_ENV env var required')
assert(
  isValidChainEnv(process.env.NEXT_PUBLIC_CHAIN_ENV),
  `NEXT_PUBLIC_CHAIN_ENV must be one of ${Object.keys(CHAIN_ENVS).join(', ')}`
)

// Export available chains for chain env
export const AVAILABLE_CHAINS = CHAIN_ENVS[process.env.NEXT_PUBLIC_CHAIN_ENV]
export const AVAILABLE_CHAIN_IDS = Object.values(AVAILABLE_CHAINS).map(
  (chain) => chain.id
)

// Export default chain for the chain env
export const DEFAULT_CHAIN = AVAILABLE_CHAINS[0]
