import { addIPFSGateway } from './addIPFSGateway'

export async function decodeContractUri(contractURI?: string, ipfsGateway?: string) {
  const url = !contractURI.startsWith('data:application')
    ? addIPFSGateway(contractURI, ipfsGateway)
    : undefined

  if (!url) return null

  try {
    const contractURIData = await fetch(url)
      .then((res) => res.text())
      .then((t) => {
        try {
          return JSON.parse(t.replace(/\\n/g, ' '))
        } catch (e) {
          return null
        }
      })
    return contractURIData
  } catch (err) {
    console.error(err)
    return null
  }
}
