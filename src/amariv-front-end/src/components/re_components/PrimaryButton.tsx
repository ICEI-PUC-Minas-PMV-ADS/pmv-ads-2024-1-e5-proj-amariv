import { tv } from "tailwind-variants"
import * as TablerIcons from '@tabler/icons-react'
import DynamicIcon from "./DynamicIcon"

type ButtonProps = {
  title?: string
  onClick?: (e: any) => void
  color?: "primary" | "secondary" | "yellow" | "red" | "blue" | "transparent"
  leftIcon?: keyof typeof TablerIcons
  rightIcon?: keyof typeof TablerIcons
  centerIcon?: keyof typeof TablerIcons
}

const button = tv({
  slots: {
    fundo: "w-full h-14 flex items-center justify-center rounded-2xl overflow-hidden leading-5 text-center cursor-pointer",
    texto: "font-semilight"
  },
  variants: {
    cor: {
      primary: {
        fundo: "bg-primary-green",
        texto: "text-white"
      },
      secondary: {
        fundo: "bg-secondary-green",
        texto: "text-dark-green"
      },
      transparent: {
        fundo: "bg-transparent border-2 border-white",
        texto: "text-white"
      },
      yellow: {
        fundo: "bg-yellow-300",
        texto: "text-black"
      },
      red: {
        fundo: "bg-red-500",
        texto: "text-white"
      },
      blue: {
        fundo: "bg-blue-600",
        texto: "text-white"
      }
    }
  }
})

const PrimaryButton: React.FC<ButtonProps> = ({ title, onClick, color = "primary", rightIcon, leftIcon, centerIcon }: ButtonProps) => {
  const { fundo, texto } = button()
  return (
    <div className={fundo({ cor: color })} onClick={onClick}>
      {
        leftIcon &&
        <div className="mr-2">
          <DynamicIcon iconName={leftIcon} className={texto({ cor: color })} />
        </div>
      }
      {
        centerIcon &&
        <div>
          <DynamicIcon iconName={centerIcon} className={texto({ cor: color })} />
        </div>
      }
      {
        title &&
        <p className={texto({ cor: color })}>{title}</p>
      }
      {
        rightIcon &&
        <div className="ml-2">
          <DynamicIcon iconName={rightIcon} className={texto({ cor: color })} />
        </div>
      }
    </div>
  )
}
export default PrimaryButton