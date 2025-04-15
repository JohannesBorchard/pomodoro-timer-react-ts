import { ReactNode } from "react"

interface ButtonSecondaryProps {
  onClick?: () => void
  children: ReactNode
}

export default function ButtonSecondary(props: ButtonSecondaryProps) {
  return (
    <button
      onClick={props.onClick}
      className="inline-block cursor-pointer rounded-sm border border-white/40 bg-white/15 px-8 py-3 text-2xl font-semibold text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
    >
      {props.children}
    </button>
  )
}
