import { ReactNode } from "react"

interface ButtonPrimaryProps {
  onClick: () => void
  children: ReactNode
}

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <button
      onClick={props.onClick}
      className="inline-block cursor-pointer rounded-sm bg-white px-8 py-3 text-2xl font-semibold text-red-700 transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
    >
      {props.children}
    </button>
  )
}
