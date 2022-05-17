import React, { useState, useEffect } from "react"
import { getContract, getContractWithS } from "../helpers/contractConfig"

import Action from "./Action"

const Ballot = ({ account, isAdmin, isVoter, ballot, onVoteSubmit }) => {
  let { ballotId, ballotTitle, ballotEnd, ballotChoices } = ballot
  ballotId = parseInt(ballotId)

  const [voted, setVoted] = useState(undefined)

  useEffect(() => {
    if (account) {
      ;(async () => {
        await checkIfVoted()
      })()
    }
  }, [account])

  // mapping(address => mapping(uint256 => bool)) public voterToBallotVoted;
  const checkIfVoted = async () => {
    const contract = getContract()
    let accountVoted = await contract.voterToBallotVoted(account, ballotId)
    setVoted(accountVoted)
  }

  console.log(voted)

  return (
    <>
      {ballot && (
        <tr className='text-center'>
          <th scope='row'>{ballotId}</th>
          <td>{ballotTitle}</td>
          <td>{new Date(parseInt(ballotEnd) * 1000).toLocaleString()}</td>
          <td>
            <ul className='list-unstyled'>
              {ballotChoices.map((choice) => {
                const choiceId = parseInt(choice.choiceId)
                const choiceTitle = choice.choiceTitle
                return <li key={choiceId}>{choiceTitle}</li>
              })}
            </ul>
          </td>
          {isVoter && (
            <td>
              <ul className='list-unstyled'>
                {ballotChoices.map((choice) => {
                  const choiceId = parseInt(choice.choiceId)
                  return (
                    <li key={choiceId}>
                      <Action
                        ballotId={ballotId}
                        choiceId={choiceId}
                        onVoteSubmit={onVoteSubmit}
                        voted={voted}
                      />
                    </li>
                  )
                })}
              </ul>
            </td>
          )}
          {isAdmin() && (
            <td>
              <ul className='list-unstyled'>
                {ballotChoices.map((choice) => {
                  const choiceId = parseInt(choice.choiceId)
                  const choiceCount = parseInt(choice.choiceCount)
                  return <li key={choiceId}>{choiceCount}</li>
                })}
              </ul>
            </td>
          )}
        </tr>
      )}
    </>
  )
}

export default Ballot
