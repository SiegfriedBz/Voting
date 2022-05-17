const hre = require("hardhat")

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting")
  const contract = await Voting.deploy()

  await contract.deployed()

  console.log("Voting deployed to:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
