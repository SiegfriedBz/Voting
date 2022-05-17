import React from "react"
import Ballot from "./Ballot"

const BallotList = ({ account, isAdmin, isVoter, ballots, onVoteSubmit }) => {
  return (
    <table className='table align-middle'>
      <thead>
        <tr className='text-center'>
          <th scope='col'>Id</th>
          <th scope='col'>Title</th>
          <th scope='col'>End</th>
          <th scope='col'>Choices</th>
          {isVoter && <th scope='col'>Action</th>}
          {isAdmin() && <th scope='col'>Results</th>}
        </tr>
      </thead>
      <tbody>
        {ballots &&
          ballots.map((ballot) => {
            const ballotId = parseInt(ballot.ballotId)
            return (
              <Ballot
                key={ballotId}
                account={account}
                isAdmin={isAdmin}
                isVoter={isVoter}
                ballot={ballot}
                onVoteSubmit={onVoteSubmit}
              />
            )
          })}
      </tbody>
    </table>
  )
}

export default BallotList
