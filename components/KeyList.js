import Key from './Key.js'
export default (props) => {
  return (
    <div className="container">
      {props.keys.map((key, index) => (
        <div key={index} className="container">
          <Key _key={key} />
        </div>
      ))}
    </div>
  )
}
