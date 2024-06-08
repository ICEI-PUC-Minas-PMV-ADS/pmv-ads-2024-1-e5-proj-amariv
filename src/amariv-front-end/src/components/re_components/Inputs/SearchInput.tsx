import { InputHTMLAttributes } from "react"
import Input from "./Input"


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  internalSelectable?: boolean,
  valueInternalSelectable?: string,
  onClickInternalSelectable?: () => void
  value?: any
  selectableInputIconOpen?: boolean
  color?: "primary" | "secondary"
}

const SearchInput: React.FC<Props> = ({ internalSelectable, valueInternalSelectable, onClickInternalSelectable, value: value, selectableInputIconOpen, color, ...props }) => {
  return (
    <Input leftIcon="IconSearch" internalSelectable={internalSelectable} placeholder="Pesquisar..." valueInternalSelectable={valueInternalSelectable} onClickInternalSelectable={onClickInternalSelectable} value={value} selectableInputIconOpen={selectableInputIconOpen} color={color} {...props}></Input>
  )
}
export default SearchInput