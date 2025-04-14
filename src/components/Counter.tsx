interface CounterProps {
  timeLeft: () => string
}

export default function Counter(props: CounterProps) {
  return (
    <div className="mb-6 flex h-70 w-70 flex-col items-center justify-center rounded-full border-2 border-white/80 leading-0 shadow-xl select-none">
      <span className="mb-0 w-full text-center font-mono text-7xl font-bold">
        {props.timeLeft()}
      </span>
      <span className="text-lg font-semibold text-white/80">5 min. Break</span>
    </div>
  )
}
