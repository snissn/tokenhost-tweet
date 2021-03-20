import React, { Component, useEffect, useState } from 'react'
import Send from '../components/Send'
import Tweets from '../components/Tweets'

import { setupAccounts } from '../helpers/Web3Helper'

export default (props) => {
  useEffect(() => {
    setupAccounts()
  }, [])

  return (
    <div className="container">
      <Send />
      <Tweets />
    </div>
  )
}
