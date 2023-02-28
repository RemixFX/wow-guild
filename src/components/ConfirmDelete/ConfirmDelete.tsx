import { useState } from "react"

const ConfirmDelete = (props: { confirmationAccepted: () => void }) => {

  const [isShowConfirmBlock, setIsShowConfirmBlock] = useState(false)

  const handleClickAcceptToDelete = () => {
    setIsShowConfirmBlock(false)
    props.confirmationAccepted()
  }

  return (
    <div className="buttons-block">
      <button className="delete-button" type="button"
        onClick={() => setIsShowConfirmBlock(true)}></button>
      {isShowConfirmBlock &&
        <div className="confirm-delete">
          <button className="confirm-delete__button confirm-delete__button_type_accept"
            type="button" onClick={handleClickAcceptToDelete}>&#10003;</button>
          <button className="confirm-delete__button confirm-delete__button_type_cancel"
            type="button" onClick={() => setIsShowConfirmBlock(false)}>&#10007;</button>
        </div>}
    </div>
  )
}

export default ConfirmDelete
