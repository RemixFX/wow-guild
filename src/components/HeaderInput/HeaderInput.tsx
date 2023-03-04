import { LegacyRef, useState } from "react"

interface IProps {
  isOpenTextInput: boolean;
  inputRef: LegacyRef<HTMLInputElement> | undefined;
  inputValue: (arg: string) => void;
  title?: string;
}
const HeaderInput = (props: IProps) => {

  const [textInputValue, setTextInputValue] = useState(props.title ? props.title : '')

  if (props.isOpenTextInput) {
    return (
      <input className="header-input" ref={props.inputRef} onBlur={() => props.inputValue(textInputValue)}
        value={textInputValue} onChange={e => setTextInputValue(e.target.value)} />
    )
  } else return (
    <h1 className="header-text">{textInputValue}</h1>
  )
}



export default HeaderInput
