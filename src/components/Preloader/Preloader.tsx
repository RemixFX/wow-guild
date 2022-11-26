import { FC } from "react"

const Preloader:FC<{addClass: string}> = ({addClass}) => {

  return (
    <div className={`lds-spinner ${addClass}`}>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
      <div className="lds-spinner__element"></div>
    </div>
  )
}

export default Preloader
