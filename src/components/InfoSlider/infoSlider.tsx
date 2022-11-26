import { FC } from "react"

const InfoSlider: FC<{ infoMessage: string }> = ({ infoMessage }) => {
  return(
    <div className='slider'>
      {infoMessage}
    </div>
  )
}

export default InfoSlider
