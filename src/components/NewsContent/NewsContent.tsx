import { INews } from "../../models/newsModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDeleteGuildNews } from "../../store/reducers/ActionCreators";

const NewsContent = (props: {message: INews, activeNewsGuild: string}) => {

  const dispatch = useAppDispatch();
  const {loggedIn} = useAppSelector(state => state.admin)
  const URL_REGEX = /(\b((https?|ftp|file):\/\/|(www))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]*)/ig;

  const renderText = (text: string) => {
    return text.split("\n").join(" \n ").split(' ')
      .map(part => {
        if (part.includes('<https')) part = part.replace('<https', 'https')
        if (part.includes('/>')) part = part.replace('/>', '')
        if (part.match(URL_REGEX)) {
          return (<a href={part} target="_blank" key={part} rel="noreferrer">{part + ' '} </a>)
        } else return part + " "
      })
  }

  const handleClickDeleteButton = (id: number) => {
    dispatch(fetchDeleteGuildNews(id))
  }

  return (
    <article className="content">
      <div className="content__container">
        <div className="content__align-block">
          <p className="content__owner">{props.message.owner}</p>
          <p className="content__date">{props.message.date}</p>
        </div>
        {(props.message.owner !== 'SIRUS #рейды' && loggedIn
         && props.activeNewsGuild === 'active') &&
        <button className="content__delete-button" type="button"
        onClick={() => handleClickDeleteButton(props.message.id)}></button>}
      </div>
      <p className="content__message">{renderText(props.message.content)}</p>
    </article>
  )
}

export default NewsContent;
