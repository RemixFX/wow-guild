/* eslint-disable jsx-a11y/iframe-has-title */
const discordImage = require('../../images/Discord.gif')

const Invite = () => {

  return (
    <section className="invite">
      <p className="invite__text">
        Переходите в дискорд нашей гильдии и отправляйте заявку на вступление по форме.
      </p>
      <a className="invite__link" target="_blank" rel="noreferrer" href="https://discord.gg/PJgHejJMnq">
        <span className="invite__span"></span>
        <span className="invite__span"></span>
        <span className="invite__span"></span>
        <span className="invite__span"></span>
        <img className="invite__image" src={discordImage} alt="discord-logo" />
      </a>
      <div className="invite__widget">
        <iframe src="https://discord.com/widget?id=681202141024485403" width="550" height="500" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
      </div>
    </section>
  )
}

export default Invite
