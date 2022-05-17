import { ethers } from "ethers"
import contractArtifact from "../artifacts/contracts/Voting.sol/Voting.json"
const contractAddress = "0x884Cc075B91D294508b0eB478FC46ea1f0626a9b"
const contractABI = contractArtifact.abi

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(contractAddress, contractABI, provider)
  return contract
}
export const getContractWithS = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractWithS = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  return contractWithS
}
