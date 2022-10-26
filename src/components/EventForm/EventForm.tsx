import { Dispatch, FC, SetStateAction } from "react";
import Modal from "../Modal/Modal";

interface IProps {
  setShowingEventForm: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const EventForm:FC<IProps> = ({ setShowingEventForm, title}) => {


  return (

    <Modal onClose={() => setShowingEventForm(false)} title={title}>
      <div className="form">

      </div>
    </Modal>
  )
}

export default EventForm;
