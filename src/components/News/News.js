import React from 'react';
import { CSSTransition } from 'react-transition-group';
import NewsContent from '../NewsContent/NewsContent';

function News(props) {

  const [activeNewsGuild, setActiveNewsGuild] = React.useState('active');
  const [activeNewsServer, setActiveNewsServer] = React.useState('');

  return (
    <CSSTransition
      in={props.isShowOnline}
      classNames='transform-news'
      timeout={2000}
    >
      <section className='news'>
        <div className="tab">
          <button
            className={`tablinks ${activeNewsGuild}`}
            onClick={() => {
              setActiveNewsServer('')
              setActiveNewsGuild('active')
            }}
          >Новости гильдии</button>
          <button
            className={`tablinks ${activeNewsServer}`}
            onClick={() => {
              setActiveNewsServer('active')
              setActiveNewsGuild('')
            }}
          >Новости сервера</button>
        </div>
        <div className='tabcontent'>
          {(activeNewsGuild === 'active' ? props.guildMessages : props.serverMessages).map((message) =>
            <NewsContent message={message} key={message.id} />
          )}
        </div>
      </section>
    </CSSTransition>
  )

}

export default News;
