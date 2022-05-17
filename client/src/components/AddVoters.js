import React, { useState } from "react"

const AddVoters = ({ onAddVoters }) => {
  const [voters, setVoters] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    await onAddVoters(voters)
    setVoters([])
  }
  return (
    <form onSubmit={handleSubmit} className='my-3'>
      <div className='d-flex flex-column ms-2 align-items-center'>
        <label htmlFor='voters' className='form-label'>
          Add Voters
        </label>
        <input
          id='voters'
          className='form-control'
          onChange={(e) => {
            setVoters([...voters, ...e.target.value.split(", ")])
          }}
        ></input>
        <div className='d-flex justify-content-center mt-1'>
          <button type='submit' className='btn btn-primary btn-sm'>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddVoters
