import React from 'react';
import News from '../News/News'
import Online from '../Online/Online'

function Main(props) {



  return (
        <section className='main' >
          <News
            isEmptyResult={props.isEmptyResult}
          />
          <Online
            players={props.players}
            isLoading={props.isLoading}
            isEmptyResult={props.isEmptyResult}
          />
        </section>
  )
}



export default Main;
