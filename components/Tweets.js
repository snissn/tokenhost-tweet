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
      if(messages_count == 0 ){
        return []
      }
      const COUNT = 20
      const count = Math.min(COUNT, messages_count);
      const offset = Math.max(0,messages_count - count)
      let ret = []
   
      var messages = await contractws.methods.get_last_Tweets_N(count,offset).call()
      for(var i = messages[0].length-1; i>-1 ; i--){
        var msg = {"text":messages[0][i], timestamp:messages[1][i],sender:messages[2][i], id:i}
        ret.push(msg)
      }
     
    return ret
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
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    )
  }
}
