import TimeAgo from 'react-timeago';

export default (props) => {
  const tweet = props.tweet;
  return (
    <section className="hero is-primary is-bold  mb-6">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {tweet.text}
          </h1>

          <h2 className="subtitle">
            <TimeAgo date={tweet.timestamp*1000} />
          </h2>
        </div>
      </div>
    </section>
  );
};
