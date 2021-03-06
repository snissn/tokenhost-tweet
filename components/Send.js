import React, { useState, useEffect } from 'react'
import { auth } from '../lib/db'

import { contract, w3 } from '../helpers/Web3Helper'

export default function Send() {
  const [message, setMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [sendStatus, setSendStatus] = useState()
  const [user, setUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

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
            .send({ gas: gasEstimate  })
            .then(() => {
              setSendStatus('')
              setMessage('')
            })
        })
    }
  }
  if (user) {
    return (
      /* Sorry about how ugly this is, using inline styles doesn't work for whatever reason */
      <form ref={(node) => {
        if (node) {
          node.style.setProperty("padding-left", "0rem", "important");
          node.style.setProperty("padding-right", "0rem", "important");
        }
      }}
      className="p-6" onSubmit={mySubmitHandler}>
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

          <p className="control" style = {{margin:0}}>
            <input
              className={
                sendStatus === 'Sending'
                  ? 'button is-info is-bold'
                  : 'button is-warning has-text-white is-bold'
              }
              type="submit"
              value={sendStatus === 'Sending' ? 'Sharing...' : 'Share'}
            />
          </p>
          <p>{errorMessage && errorMessage}</p>
        </div>
      </form>
    )
  } else {
    return (
      <section className="hero is-warning mb-6">
        <div className="hero-body">
          <div className="container">
            <h3 className="title has-text-centered is-5">Please sign in to leave a message</h3>
          </div>
        </div>
      </section>
    )
  }
}
