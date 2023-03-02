/* eslint-disable react-hooks/exhaustive-deps */
import { LegacyRef, useEffect, useState } from "react"

const HeaderInput = (props: {isOpenTextInput: boolean, inputRef: LegacyRef<HTMLInputElement> | undefined, inputValue: (arg: string) => void}) => {

  const [textInputValue, setTextInputValue] = useState('')

  useEffect(() => {
    props.inputValue(textInputValue)
  }, [props.isOpenTextInput])

  if (props.isOpenTextInput) {
    return (
      <input className="header-input" ref={props.inputRef}
        value={textInputValue} onChange={e => setTextInputValue(e.target.value)} />
    )
  } else return (
    <h1 className="header-text">{textInputValue}</h1>
  )
}



export default HeaderInput
