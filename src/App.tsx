import { useState } from "react"
import ButtonPrimary from "./components/ButtonPrimary"
import ButtonSecondary from "./components/ButtonSecondary"
import Header from "./components/Header"
import Counter from "./components/Counter"
import DurationPicker from "./components/DurationPicker"

/*
[x] User should be able to start stop and resume a Pomodoro timer.
[ ] User should be able to configure the default interval configuration; default work session should be 25 minutes, short break should be 5 minutes and longer break after 4 work sessions should be 15 minutes.
[ ] Application should display the current session type (e.g., Work, Short Break, Long Break).
[ ] It should also track the number of tracked work sessions
[ ] Play a sound when a session ends to notify the user.
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

  const [state, setState] = useState<TimerState>("default")

  const bgColor = () => {
    if (state === "default" || state === "working") return "bg-red-700"
    if (state === "pause" || state === "shortBreak") return "bg-blue-700"
  }
  const [config, setConfig] = useState({
    numberOfSessions: 8,
    working: 25,
    shortBreak: 5,
    longBreak: 15
  })

  const timeTable: TimerState[] = ["working", "shortBreak"]

  let activeTimeTableIndex = 0

  function startWork() {
    setState(timeTable[activeTimeTableIndex])
  }

  function nextState() {
    if (timeTable.length > activeTimeTableIndex) {
      activeTimeTableIndex++
    } else if (timeTable.length === activeTimeTableIndex) {
      setState("finished")
    }
    setState(timeTable[activeTimeTableIndex])
  }

  return (
    <>
      <div className={"h-screen text-white " + bgColor()}>
        <Header />
        <main className="flex flex-col items-center">
          {state}
          <DurationPicker />
          <Counter state={state} nextState={nextState} config={config} />

          {state === "default" && (
            <ButtonPrimary onClick={() => startWork()}>Start</ButtonPrimary>
          )}

          {state === "working" ||
            (state === "shortBreak" && (
              <ButtonSecondary onClick={() => setState("pause")}>
                Pause
              </ButtonSecondary>
            ))}

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
