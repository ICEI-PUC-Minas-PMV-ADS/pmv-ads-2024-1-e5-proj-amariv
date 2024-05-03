import * as TablerIcons from '@tabler/icons-react'
import DynamicIcon from "../DynamicIcon";
import { tv } from "tailwind-variants";
import { InputHTMLAttributes } from "react";
import { IconSquare, IconSquareCheck } from "@tabler/icons-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorMessage?: string,
  title?: string
  leftIcon?: keyof typeof TablerIcons
  rightIcon?: keyof typeof TablerIcons
  onClickLeftIcon?: () => void
  onClickRightIcon?: () => void
  internalSelectable?: boolean
  valueInternalSelectable?: string
  onClickInternalSelectable?: () => void
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
}

const input = tv({
  slots: {
    background: "py-[2px] rounded-3xl flex flex-row min-h-10 items-center border-dark-green border-[1px]",
    internalSelectableStyle: "flex flex-row items-center w-full h-full",
    selectableStyle: "",
    text: "w-full h-full ml-4 min-h-10 bg-transparent focus:outline-none",
    icon: "cursor-pointer"
  },
  variants: {
    erro: {
      true: {
        background: "border-red-500 border-solid border-[1px]"
      },
    },
    internalSelectableStyle: {
      true: {
        internalSelectableStyle: "w-[65%]",
        selectableStyle: "w-[35%] border-l-[1px] border-solid border-dark-green min-h-10 flex items-center justify-between px-2"
      },
      false: ""
    },
    color: {
      primary: {
        background: "bg-input-color",
        text: "text-dark-green",
        icon: "text-primary-green"
      },

      secondary: {
        background: "bg-transparent border-dark-green",
        text: "text-dark-green",
        icon: "text-dark-green"
      },

      disabled: {
        background: "bg-[#3f5745] border-[#3f5745]",
        text: "text-[#668d70]",
        icon: "text-[#668d70]"
      }
    }
  }
})

const Input: React.FC<InputProps> = ({ title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon, error, errorMessage, internalSelectable, valueInternalSelectable, onClickInternalSelectable, selectableInput = false, color = "primary", value, internalTitle = false, selectableInputIconOpen = false, disabled = false, requiredField = false, externalCheckbox = false, onClickExternalCheckbox, titleExternalCheckbox, valueExternalCheckbox = false, onClickSelectableInput, titleColor = "light", ...props }) => {

  const { background, internalSelectableStyle, selectableStyle, text, icon } = input()


  return (
    <div>
      {
        internalTitle == false &&
        <div className="w-full flex justify-between mb-2">
          <span className={titleColor == "dark" ? "text-dark-green text-sm ml-2" : "text-white text-sm ml-2"}>{title}<span className="text-red-500">{requiredField ? " *" : ""}</span></span>

          {
            externalCheckbox &&
            <div className="flex flex-row items-center" onClick={() => {
              if (onClickExternalCheckbox)
                onClickExternalCheckbox(valueExternalCheckbox)
            }}>
              {
                valueExternalCheckbox == false &&
                <IconSquare className=" text-primary-green" />
              }
              {
                valueExternalCheckbox == true &&
                <IconSquareCheck className=" text-primary-green" />
              }
              <p className="font-light text-text-gray dark:text-white pl-2">{titleExternalCheckbox}</p>
            </div>
          }
        </div>

      }
      <div
        onClick={onClickSelectableInput}
        className={background({ erro: error, color: disabled ? "disabled" : color })}>
        <div className={internalSelectableStyle({ internalSelectableStyle: internalSelectable })}>
          {
            leftIcon &&
            <div className="ml-3" onClick={onClickLeftIcon}>
              <DynamicIcon iconName={leftIcon} className={icon({ color: color })} />
            </div>
          }
          {
            selectableInput == false &&
            <input
              className={text({ color: disabled ? "disabled" : color })}
              disabled={disabled}
              value={value}
              {...props} />
          }
          {
            selectableInput == true &&
            <>
              {

                internalTitle == true &&

                <div className="w-full ml-4 min-h-10 flex flex-col justify-center leading-[15px] text-nowrap overflow-hidden">
                  {
                    disabled == false &&
                    <span className=" text-[11px] text-dark-green text-nowrap">{title}<span className="text-red-500">{requiredField ? " *" : ""}</span></span>
                  }
                  {
                    disabled == true &&
                    <span className=" text-[11px] text-neutral-500  text-nowrap ">{title}<span className="text-red-500">{requiredField ? " *" : ""}</span></span>
                  }



                  {
                    disabled == true &&
                    <p className="text-neutral-500 text-nowrap ">{value}</p>
                  }
                  {
                    disabled == false &&
                    <p className="text-dark-green text-nowrap">{value}</p>
                  }
                </div>

              }
              {

                internalTitle == false &&

                <div className="w-full ml-4 min-h-10 flex flex-col justify-center py-2">
                  {
                    disabled == true &&
                    <p className="text-neutral-500">{value}</p>
                  }
                  {
                    disabled == false &&
                    <p className="text-dark-green ">{value}</p>
                  }
                </div>
              }
            </>
          }
          {rightIcon &&
            <div className="mx-3" onClick={onClickRightIcon}>
              <DynamicIcon iconName={rightIcon} className={icon({ color: disabled ? "disabled" : color })} />
            </div>
          }
        </div>
        <div className={selectableStyle({ internalSelectableStyle: internalSelectable })} onClick={onClickInternalSelectable}>
          {
            internalSelectable &&
            <>
              <div className=" text-nowrap flex flex-col leading-[15px]">
                <p className=" text-[11px] text-dark-green dark:text-light-gray">Pesquisar por</p>
                <p className="text-dark-green text-nowrap w-[80%]">{valueInternalSelectable}</p>
              </div>
              <DynamicIcon iconName={selectableInputIconOpen ? "IconChevronUp" : "IconChevronDown"} className={icon({ color: disabled ? "disabled" : color })} />
            </>
          }
        </div>
      </div>
      {
        error == true && errorMessage != null &&
        <p className=" font-light text-red-500 text-[12px]">{errorMessage}</p>
      }
    </div>
  )
};
export default Input;