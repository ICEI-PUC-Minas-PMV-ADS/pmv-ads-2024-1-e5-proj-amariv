
import { InputHTMLAttributes } from "react";
import Input from "./Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorMessage?: string,
  title?: string
  color?: "primary" | "secondary"
  selectableInput?: boolean
  value?: string | undefined | number
  internalTitle?: boolean
  selectableInputIconOpen?: boolean
  disabled?: boolean
  requiredField?: boolean
  externalCheckbox?: boolean
  valueExternalCheckbox?: boolean
  onClickExternalCheckbox?: (checkbox: boolean) => void
  titleExternalCheckbox?: string
  onClickSelectableInput?: () => void
  titleColor?: "dark" | "light"
  calendarIcon?: boolean
  iconOpen?: boolean
}

const InputSelecionavel: React.FC<Props> = ({ title, onClickSelectableInput, error, errorMessage, color, value, internalTitle, calendarIcon, iconOpen, disabled, requiredField, ...props }) => {

  return (
    <div >
      <Input color={color} title={title} selectableInput={true} rightIcon={calendarIcon ? "IconCalendarEvent" : (iconOpen ? "IconChevronUp" : "IconChevronDown")} readOnly error={error} errorMessage={errorMessage} value={value} internalTitle={internalTitle}
        disabled={disabled} requiredField={requiredField} onClickSelectableInput={onClickSelectableInput}{...props} />
    </div>

  )
}
export default InputSelecionavel