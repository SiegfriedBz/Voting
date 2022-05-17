import { useState, useEffect } from "react"
import { connect } from "./helpers/connect"
import { getContract, getContractWithS } from "./helpers/contractConfig"
import Banner from "./components/Banner"
import AddVoters from "./components/AddVoters"
import CreateBallot from "./components/CreateBallot"
import BallotList from "./components/BallotList"

function App() {
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState("")
  const [contractWithS, setContractWithS] = useState("")
  const [admin, setAdmin] = useState("")
  const [isVoter, setIsVoter] = useState(undefined)
  const [ballots, setBallots] = useState([])

  useEffect(() => {
    ;(async () => {
      const account = await connect()
      const contract = getContract()
      const contractWithS = getContractWithS()
      setAccount(account)
      setContract(contract)
      setContractWithS(contractWithS)
    })()
  }, [account])

  useEffect(() => {
    if (contract) {
      ;(async () => {
        const admin = await contract.admin()
        setAdmin(admin)
        getBallots()
      })()
    }
  }, [contract])

  useEffect(() => {
    if (contract) {
      checkIfVoter()
    }
  })

  const isAdmin = () => {
    if (account && admin) {
      return account.toLowerCase() === admin.toLowerCase()
    }
  }

  const checkIfVoter = async () => {
    const isVoter = await contract.voters(account)
    setIsVoter(isVoter)
  }

  const onAddVoters = async (voters) => {
    let trx = await contractWithS.addVoters(voters)
    await trx.wait()
    checkIfVoter()
  }

  const getBallots = async () => {
    let nberOfBallots = await contract.nextBallotId()
    nberOfBallots = parseInt(nberOfBallots)
    const ballots = []
    for (let i = 0; i < nberOfBallots; i++) {
      let ballot = await Promise.all([contract.getBallot(i)])
      ballots.push(...ballot)
    }
    setBallots(ballots)
  }

  const onCreateBallot = async (ballot) => {
    let trx = await contractWithS.createBallot(
      ballot.title,
      ballot.offset,
      ballot.choices
    )
    await trx.wait()
    getBallots()
  }

  const onVoteSubmit = async (ballotId, choiceId) => {
    console.log(ballotId)
    console.log(choiceId)
    let trx = await contractWithS.vote(ballotId, choiceId, {
      gasLimit: 3000000,
    })
    await trx.wait()
    getBallots()
  }

  return (
    <div>
      <Banner account={account} isVoter={isVoter} checkIfVoter={checkIfVoter} />
      <div className='container'>
        {isAdmin() && <AddVoters onAddVoters={onAddVoters} />}
        {isAdmin() && <CreateBallot onCreateBallot={onCreateBallot} />}
        <BallotList
          account={account}
          isAdmin={isAdmin}
          isVoter={isVoter}
          ballots={ballots}
          onVoteSubmit={onVoteSubmit}
        />
      </div>
    </div>
  )
}

export default App
