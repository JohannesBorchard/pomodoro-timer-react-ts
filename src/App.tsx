import { useState, useEffect } from "react"
import ButtonPrimary from "./components/ButtonPrimary"
import ButtonSecondary from "./components/ButtonSecondary"
import Header from "./components/Header"
import Counter from "./components/Counter"
import DurationPicker from "./components/DurationPicker"
import tickSound from "./assets/clock_tick.wav"
import successSound from "./assets/success.wav"

/*
[x] User should be able to start stop and resume a Pomodoro timer.
[ ] User should be able to configure the default interval configuration; default work session should be 25 minutes, short break should be 5 minutes and longer break after 4 work sessions should be 15 minutes.
[ ] Application should display the current session type (e.g., Work, Short Break, Long Break).
[ ] It should also track the number of tracked work sessions
[ ] Play a sound when a session ends to notify the user.
[ ] Ensure the app is accessible and visually appealing on both desktop and mobile devices.
*/

function App() {
  //ändern in array mit abwechselnd arbeit und pause in sekunden - abhängig von einstellungen
  const [secondsLeft, setSecondsLeft] = useState(5)

  const [state, setState] = useState("default")

  useEffect(() => {
    //noch nicht gestartet oder gerade pausiert
    if (state === "default" || state === "pause") {
      return undefined
      //vorbei
    } else if (secondsLeft <= 0) {
      const successAudio = new Audio(successSound)
      successAudio.currentTime = 0
      successAudio.play().catch(() => {})
      return undefined
      //timer läuft
    } else if (state === "working" || state === "break") {
      const tickAudio = new Audio(tickSound)
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          tickAudio.currentTime = 0
          tickAudio.play().catch(() => {})
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [secondsLeft, state])

  function formatTimeFromSeconds(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <>
      <div className="h-screen bg-red-700 text-white">
        <Header />
        <main className="flex flex-col items-center">
          <DurationPicker />
          <Counter timeLeft={() => formatTimeFromSeconds(secondsLeft)} />

          {state === "default" && (
            <ButtonPrimary onClick={() => setState("working")}>
              Start
            </ButtonPrimary>
          )}

          {state === "working" && (
            <ButtonSecondary onClick={() => setState("pause")}>
              Pause
            </ButtonSecondary>
          )}

          {state === "pause" && (
            <ButtonPrimary onClick={() => setState("working")}>
              Resume
            </ButtonPrimary>
          )}
        </main>
      </div>
    </>
  )
}

export default App
