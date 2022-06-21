/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import News from '../News/News'
import Online from '../Online/Online'

function Main(props) {

const [isShowOnline, setIsShowOnline] = React.useState(false);

const handleClick = () => {
    setIsShowOnline(!isShowOnline)
    console.log(isShowOnline)
}

React.useEffect(() => {
  props.isEmptyResult && handleClick();
}, [props.isEmptyResult])

  return (
        <section className='main' >
          <News
            isEmptyResult={props.isEmptyResult}
            isShowOnline={isShowOnline}
          />
          <Online
            players={props.players}
            isLoading={props.isLoading}
            isEmptyResult={props.isEmptyResult}
            handleClick={handleClick}
            isShowOnline={isShowOnline}
          />
        </section>
  )
}



export default Main;
