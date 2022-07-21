
function NewsContent(props) {
  return (
    <article className="content">
      <div className="content__container">
        <p className="content__owner">{props.message.owner}</p>
        <p className="content__date">{props.message.date}</p>
      </div>
      <p className="content__message">{props.message.content}</p>
    </article>
  )
}

export default NewsContent;
