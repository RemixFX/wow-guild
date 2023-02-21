import { useState } from "react";
import { INews } from "../../models/newsModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDeleteGuildNews } from "../../store/reducers/ActionCreators";

const NewsContent = (props: {message: INews, activeNewsGuild: string}) => {

  const dispatch = useAppDispatch();
  const {loggedIn} = useAppSelector(state => state.admin)
  const [isShowConfirmBlock, setIsShowConfirmBlock] = useState(false)
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

  const handleClickAcceptToDelete = (id: number) => {
    dispatch(fetchDeleteGuildNews(id))
    setIsShowConfirmBlock(true)
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
         <div className="content__delete-button-block">
        <button className="content__delete-button" type="button"
        onClick={() => setIsShowConfirmBlock(true)}></button>
        {isShowConfirmBlock &&
        <div className="confirm-delete">
          <button className="confirm-delete__button confirm-delete__button_type_accept"
          type="button" onClick={() => handleClickAcceptToDelete(props.message.id)}>&#10003;</button>
          <button className="confirm-delete__button confirm-delete__button_type_cancel"
          type="button" onClick={() => setIsShowConfirmBlock(false)}>&#10007;</button>
        </div>}
        </div>}
      </div>
      <p className="content__message">{renderText(props.message.content)}</p>
    </article>
  )
}

export default NewsContent;
