import News from '../News/News'
import Online from '../Online/Online'

function Main(props) {
  return (
    <section className="main">
      <News />
      <Online players={props.players}/>
    </section>
  )
}

export default Main;
