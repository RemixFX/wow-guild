/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import News from '../News/News'
import Online from '../Online/Online'

function Main(props: any) {

  const [isShowOnline, setIsShowOnline] = React.useState(false);

  const handleClick = () => {
    setIsShowOnline(!isShowOnline)
    if (props.isEmptyResult && isShowOnline) {
      setTimeout(() => {
        props.getUsersData();
        if (props.isEmptyResult) {
          setTimeout(() => setIsShowOnline(true), 2000)
        }
      }, 2000);
    }
  }

React.useEffect(() => {
  props.isEmptyResult && handleClick();
}, [props.isEmptyResult])

return (
  <section className='main' >
    <News
      isEmptyResult={props.isEmptyResult}
      isShowOnline={isShowOnline}
      guildMessages={props.guildMessages}
      serverMessages={props.serverMessages}
    />
    <Online
    />
  </section>
)
}



export default Main;
