import React from "react"

const Action = ({ voted, ballotId, choiceId, onVoteSubmit }) => {
  const votedClass = () => {
    return voted
      ? "btn btn-warning btn-sm text-decoration-line-through m-1"
      : "btn btn-primary btn-sm m-1"
  }

  return (
    <div>
      <button
        onClick={() => {
          onVoteSubmit(ballotId, choiceId)
        }}
        className={votedClass()}
      >
        Vote
      </button>
    </div>
  )
}

export default Action
