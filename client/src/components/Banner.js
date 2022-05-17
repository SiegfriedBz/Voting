import { spinner } from "../helpers/loadingSpinner"

const Banner = ({ account, isVoter }) => {
  return (
    <div id='banner'>
      <div className='d-flex justify-content-between align-items-center mx-3'>
        <div className='d-flex'>
          <h1>Voting App</h1>
        </div>
        <div className='d-flex flex-column align-items-around btn-primary rounded p-3'>
          <div className='d-flex justify-content-center'>Account</div>
          <div className='d-flex justify-content-center'>
            {!account
              ? spinner("blue")
              : `${account.slice(0, 4)}...${account.slice(38, 42)}`}
          </div>
          <div className='d-flex justify-content-center'>
            {typeof isVoter == "undefined"
              ? spinner("white")
              : isVoter
              ? "Voter"
              : "Non-Voter"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
