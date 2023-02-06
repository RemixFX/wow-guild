
function NewsContent(props: any) {

  const URL_REGEX = /(\b((https?|ftp|file):\/\/|(www))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]*)/ig;

  const renderText = (txt: string) => {
    return txt.split("\n").join(" \n ").split(' ')
      .map(part => {
        if (part.includes('<https')) part = part.replace('<https', 'https')
        if (part.includes('/>')) part = part.replace('/>', '')
        if (part.match(URL_REGEX)) {
          return (<a href={part} target="_blank" key={part} rel="noreferrer">{part + ' '} </a>)
        } else return part + " "
      })
  }

  return (
    <article className="content">
      <div className="content__container">
        <p className="content__owner">{props.message.owner}</p>
        <p className="content__date">{props.message.date}</p>
      </div>
      <p className="content__message">{renderText(props.message.content)}</p>
    </article>
  )
}

export default NewsContent;
