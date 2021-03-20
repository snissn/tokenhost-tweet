import React from 'react'
import Tweet from './Tweet.js'

import { w3, contractws } from '../helpers/Web3Helper'
function zip(arr1, arr2, out = {}) {
  arr1.map((val, idx) => {
    out[val] = arr2[idx]
  })
  return out
}

const blendstyle = {
  color: 'white',
}

export default class PublicMessages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      publicMessages: {
        data: [],
      },
    }
  }

  async setUpListeners() {
    var that = this
    contractws.events.allEvents(
      'allEvents',
      {
        fromBlock: 'latest',
      },
      async function (err, data) {
        console.log('event', data)
        await that.fetch()
      },
    )
  }

  async fetch() {
    const response = await this.getPublicMessages()
    this.setState({ publicMessages: { data: response } })
  }

  async componentDidMount() {
    await this.fetch()
    await this.setUpListeners()
  }

  async getPublicMessages() {
    var messages_count = await contractws.methods
      .get_Tweets_list_length()
      .call()
    var messages = []
    for (
      var index = messages_count - 1;
      index >= Math.max(0, messages_count - 10);
      index--
    ) {
      var message = await contractws.methods.get_Tweets_N(index).call()

      const keys = ['text', 'timestamp', 'sender'] // need automagic version of this
      console.log('hi', keys, message)
      message = zip(keys, message)

      messages.push(message)
    }
    return messages
  }

  render() {
    if (this.state.publicMessages.data.length == 0) {
      return (
        <div>
          <span className="sr-only">Loading...</span>
        </div>
      )
    }

    return (
      <div>
        {this.state.publicMessages.data.map((tweet, index) => (
          <Tweet key={index} tweet={tweet} />
        ))}
      </div>
    )
  }
}
