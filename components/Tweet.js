import TimeAgo from 'react-timeago'
import User from './User.js'

export default (props) => {
  const tweet = props.tweet
  return (
    <section className="hero is-primary mb-6">
      <div className="hero-body">
        <div className="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <User sender={tweet.sender} key={props.key} />
            </div>
            <div class="column">
              <h1 className="title">{tweet.text}</h1>
              <h2 className="subtitle">
                <TimeAgo date={tweet.timestamp * 1000} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
