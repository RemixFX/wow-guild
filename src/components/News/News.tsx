import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../../store/hooks';
import NewsContent from '../NewsContent/NewsContent';

function News(props: any) {

  const [activeNewsGuild, setActiveNewsGuild] = React.useState('active');
  const [activeNewsServer, setActiveNewsServer] = React.useState('');

  const {isShowOnline} = useAppSelector(state => state.online)

  return (
    <CSSTransition
      in={!isShowOnline}
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
          {(activeNewsGuild === 'active' ? props.guildMessages : props.serverMessages).map((message: any) =>
            <NewsContent message={message} key={message.id} />
          )}
        </div>
      </section>
    </CSSTransition>
  )

}

export default News;
