import React, { useState } from 'react'

import { contract, w3 } from '../helpers/Web3Helper'

export default function Send() {
  const [message, setMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [sendStatus, setSendStatus] = useState()

  const mySubmitHandler = async (event) => {
    event.preventDefault()
    if (message === '') {
      setErrorMessage('Your message cannot be empty')
    } else {
      setSendStatus('Sending')
      contract.methods
        .new_Tweets(message)
        .estimateGas()
        .then((gasEstimate) => {
          contract.methods
            .new_Tweets(message)
            .send({ gas: gasEstimate, from: localStorage.getItem('ADDRESS') })
            .then(() => {
              setSendStatus('')
              setMessage('')
            })
        })
    }
  }

  return (
    <form className="p-6" onSubmit={mySubmitHandler}>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            autoComplete="off"
            className="input"
            placeholder="Type your message here..."
            type="text"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={sendStatus === 'Sending'}
          />
        </p>

        <p className="control">
          <input
            className={
              sendStatus === 'Sending' ? 'button is-info ' : 'button is-warning'
            }
            type="submit"
            value={sendStatus === 'Sending' ? 'Sharing...' : 'Share'}
          />
        </p>
        <p>{errorMessage && errorMessage}</p>
      </div>
    </form>
  )
}
