export const addIPFSGateway = (mediaUrl: string, customGateway?: string) => {
  if (mediaUrl.startsWith('ipfs'))
    try {
      return mediaUrl.replace(
        /^ipfs?:\/\//,
        `https://${customGateway ? customGateway : 'ipfs.io'}/ipfs/`
      )
    } catch (err) {
      return mediaUrl
    }
  else {
    return mediaUrl
  }
}
