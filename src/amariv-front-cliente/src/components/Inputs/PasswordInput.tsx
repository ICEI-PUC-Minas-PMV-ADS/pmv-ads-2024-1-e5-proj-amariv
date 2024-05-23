import { InputHTMLAttributes, useState } from "react";
import Input from "./Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorMessage?: string
  title?: string
  color?: "primary" | "secondary"
  value?: string | undefined | number
  titleColor?: "dark" | "light"
  requiredField?: boolean
}

const PasswordInput: React.FC<Props> = ({ title, error, errorMessage, titleColor, requiredField, ...props }) => {
  const [EyeOpen, SetEyeOpen] = useState(true)

  const handleEyeClick = () => {
    SetEyeOpen(!EyeOpen)
  }

  return (
    <Input title={title} rightIcon={!EyeOpen ? "IconEye" : "IconEyeOff"} onClickRightIcon={handleEyeClick} type={!EyeOpen ? "text" : "password"} {...props} error={error} errorMessage={errorMessage} titleColor={titleColor} requiredField={requiredField} />
  )
}
export default PasswordInput