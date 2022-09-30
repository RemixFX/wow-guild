import News from "../News/News";
import Online from "../Online/Online";

const Main = (props: any) => {

return (
  <section className='main' >
    <News
    guildMessages={props.guildMessages}
    serverMessages={props.serverMessages}/>
    <Online/>
  </section>
)
}

export default Main;
