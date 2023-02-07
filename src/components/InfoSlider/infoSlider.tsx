import { FC } from "react"

const InfoSlider: FC<{ infoMessage: string, error?: boolean }> = ({ infoMessage, error }) => {
  return(
    <div className={`slider ${error && 'slider__error'}`}>
      {infoMessage}
    </div>
  )
}

export default InfoSlider
