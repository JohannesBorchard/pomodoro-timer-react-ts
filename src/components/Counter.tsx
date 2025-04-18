import { useState, useEffect } from "react"
import tickSound from "../assets/clock_tick.wav"
import successSound from "../assets/success.wav"

import playAudio from "../functions/playAudio"

type TimerState =
  | "working"
  | "shortBreak"
  | "longBreak"
  | "finished"
  | "default"
  | "pause"

interface CounterProps {
  state: TimerState
  nextState: () => void
  config: {
    numberOfSessions: number
    working: number
    shortBreak: number
    longBreak: number
  }
}

export default function Counter(props: CounterProps) {
  const [secondsLeft, setSecondsLeft] = useState(5)

  useEffect(() => {
    //noch nicht gestartet oder gerade pausiert
    if (props.state === "default" || props.state === "pause") {
      return undefined
      //vorbei
    } else if (secondsLeft <= 0) {
      props.nextState()
      if (props.state === "working") {
        setSecondsLeft(props.config["working"])
      } else if (props.state === "shortBreak") {
        setSecondsLeft(props.config["shortBreak"])
      }
      playAudio(successSound)
      return undefined
      //timer läuft
    } else if (props.state === "working" || props.state === "shortBreak") {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          playAudio(tickSound)
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [secondsLeft, props.state])

  function formatTimeFromSeconds(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="mb-6 flex h-70 w-70 flex-col items-center justify-center rounded-full border-2 border-white/80 leading-0 shadow-xl select-none">
      <span className="mb-0 w-full text-center font-mono text-7xl font-bold">
        {formatTimeFromSeconds(secondsLeft)}
      </span>
      <span className="text-lg font-semibold text-white/80">5 min. Break</span>
    </div>
  )
}
