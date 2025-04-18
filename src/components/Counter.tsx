export default function Counter({
  secondsLeft,
  status
}: {
  secondsLeft: number
  status: string
}) {
  function formatTimeFromSeconds(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="mb-6 flex h-70 w-70 flex-col items-center justify-center rounded-full border-2 border-white/80 pb-3 leading-0 shadow-xl select-none">
      <span className="text-lg font-semibold text-white/80">{status}</span>
      <span className="mt-0 w-full text-center font-mono text-7xl font-bold">
        {formatTimeFromSeconds(secondsLeft)}
      </span>
    </div>
  )
}
