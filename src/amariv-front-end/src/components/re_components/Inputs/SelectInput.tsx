
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
  optionsSelectableInput?: { label: string, value: string }[]
  optionsSelectableInputOpen?: boolean
  onClickOptionSelectable?: (value: string) => void
}

const SelectInput: React.FC<Props> = ({ title, onClickSelectableInput, error, errorMessage, color, value, internalTitle, calendarIcon, iconOpen, disabled, requiredField, titleColor = "dark", optionsSelectableInput, optionsSelectableInputOpen, onClickOptionSelectable, ...props }) => {

  return (
    <div className="w-full cursor-pointer">
      <Input color={color} title={title} selectableInput={true} rightIcon={calendarIcon ? "IconCalendarEvent" : (iconOpen ? "IconChevronUp" : "IconChevronDown")} readOnly error={error} errorMessage={errorMessage} value={value} internalTitle={internalTitle} titleColor={titleColor} optionsSelectableInput={optionsSelectableInput} optionsSelectableInputOpen={optionsSelectableInputOpen} onClickOptionSelectable={onClickOptionSelectable}
        disabled={disabled} requiredField={requiredField} onClickSelectableInput={onClickSelectableInput}{...props} />
    </div>

  )
}
export default SelectInput