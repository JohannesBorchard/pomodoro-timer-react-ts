import { useState, useEffect, useCallback, useMemo } from "react"
import ButtonPrimary from "./components/ButtonPrimary"
import ButtonSecondary from "./components/ButtonSecondary"
import Header from "./components/Header"
import Counter from "./components/Counter"
import DurationPicker from "./components/DurationPicker"
//import tickSound from "./assets/clock_tick.wav"
import successSound from "./assets/success.wav"

import playAudio from "./functions/playAudio"

/*
[x] User should be able to start stop and resume a Pomodoro timer.
[ ] User should be able to configure the default interval configuration; default work session should be 25 minutes, short break should be 5 minutes and longer break after 4 work sessions should be 15 minutes.
[x] Application should display the current session type (e.g., Work, Short Break, Long Break).
[ ] It should also track the number of tracked work sessions
[x] Play a sound when a session ends to notify the user.
[ ] Ensure the app is accessible and visually appealing on both desktop and mobile devices.
*/

function App() {
  //ändern in array mit abwechselnd Arbeit und pause in Sekunden - abhängig von einstellungen
  type TimerState =
    | "working"
    | "shortBreak"
    | "longBreak"
    | "finished"
    | "default"
    | "pause"
  interface TimerStatus {
    status: TimerState
    index: number
    secondsLeft: number
  }
  interface Config {
    numberOfSessions: number
    working: number
    shortBreak: number
    longBreak: number
  }

  const [timer, setTimer] = useState<TimerStatus>({
    status: "default",
    index: 0,
    secondsLeft: 10 //TODO
  })

  const bgColor = () => {
    if (timer.status === "default" || timer.status === "working")
      return "bg-red-700"
    if (timer.status === "pause" || timer.status === "shortBreak")
      return "bg-blue-700"
    if (timer.status === "finished") return "bg-green-700"
  }
  const [config, setConfig] = useState<Config>({
    numberOfSessions: 8,
    working: 25,
    shortBreak: 5,
    longBreak: 15
  })

  const timeTable: TimerState[] = useMemo(() => {
    return ["working", "shortBreak"]
  }, [])

  const getSecondsForState = useCallback(
    (state: TimerState, config: Config): number => {
      if (state === "working") return config.working * 60
      if (state === "shortBreak") return config.shortBreak * 60
      if (state === "longBreak") return config.longBreak * 60
      return 0
    },
    []
  )

  const nextState = useCallback(
    (prev: TimerStatus): TimerStatus => {
      if (timeTable.length > prev.index) {
        const nextStatus = timeTable[prev.index + 1]
        return {
          ...prev,
          index: prev.index + 1,
          status: nextStatus,
          secondsLeft: getSecondsForState(nextStatus, config)
        }
      } else {
        return { ...prev, status: "finished" }
      }
    },
    [timeTable, config, getSecondsForState]
  )

  useEffect(() => {
    if (["working", "shortBreak", "longBreak"].includes(timer.status)) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          const nextSeconds = prev.secondsLeft - 1
          if (nextSeconds <= 0) {
            playAudio(successSound)
            return nextState(prev)
          }
          return { ...prev, secondsLeft: nextSeconds }
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer.status, config, nextState])

  function startWork() {
    setTimer((prev) => ({ ...prev, status: timeTable[timer.index] }))
  }

  return (
    <>
      <div className={"h-screen text-white " + bgColor()}>
        <Header />
        <main className="flex flex-col items-center">
          <DurationPicker />
          <Counter secondsLeft={timer.secondsLeft} status={timer.status} />

          {timer.status === "default" && (
            <ButtonPrimary onClick={() => startWork()}>Start</ButtonPrimary>
          )}

          {timer.status === "working" && (
            <ButtonSecondary
              onClick={() => setTimer((prev) => ({ ...prev, status: "pause" }))}
            >
              Pause
            </ButtonSecondary>
          )}

          {timer.status === "pause" && (
            <ButtonPrimary
              onClick={() =>
                setTimer((prev) => ({
                  ...prev,
                  status: timeTable[timer.index]
                }))
              }
            >
              Resume
            </ButtonPrimary>
          )}
        </main>
      </div>
    </>
  )
}

export default App
