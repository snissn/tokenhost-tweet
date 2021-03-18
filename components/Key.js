import TimeAgo from 'react-timeago';

export default (props) => {
  const key = props._key;
  return (
    <section className="hero is-primary is-bold  mb-6">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {key.address}
          </h1>

          <h2 className="subtitle">
            <TimeAgo date={key.createdAt.toDate()} />
          </h2>
          <div>private key: {key.key}</div>
        </div>
      </div>
    </section>
  );
};
