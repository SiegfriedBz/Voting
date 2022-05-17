import React, { useState } from "react"

const CreateBallot = ({ onCreateBallot }) => {
  const [ballot, setBallot] = useState({ title: "", offset: "", choices: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onCreateBallot(ballot)
    setBallot({ title: "", offset: "", choices: "" })
  }

  return (
    <form onSubmit={handleSubmit} className='my-3'>
      <div className='d-flex flex-column ms-2 align-items-center'>
        <label htmlFor='title' className='form-label'>
          Title
        </label>
        <input
          id='title'
          className='form-control'
          value={ballot.title}
          onChange={(e) => {
            setBallot({ ...ballot, [e.target.id]: e.target.value })
          }}
        ></input>
      </div>
      <div className='d-flex flex-column ms-2 align-items-center'>
        <label htmlFor='offset' className='form-label'>
          Offset
        </label>
        <input
          id='offset'
          className='form-control'
          value={ballot.offset}
          onChange={(e) => {
            setBallot({ ...ballot, [e.target.id]: +e.target.value })
          }}
        ></input>
      </div>
      <div className='d-flex flex-column ms-2 align-items-center'>
        <label htmlFor='choices' className='form-label'>
          Choices - comma separated
        </label>
        <input
          id='choices'
          className='form-control'
          value={ballot.choices}
          onChange={(e) => {
            setBallot({
              ...ballot,
              [e.target.id]: e.target.value.split(","),
            })
          }}
        ></input>
      </div>
      <div className='d-flex justify-content-center mt-1'>
        <button type='submit' className='btn btn-primary btn-sm'>
          Create Ballot
        </button>
      </div>
    </form>
  )
}

export default CreateBallot
