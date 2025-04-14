import { useState, useEffect } from "react"
import ButtonPrimary from "./components/ButtonPrimary"
import Header from "./components/Header"
import Counter from "./components/Counter"
import DurationPicker from "./components/DurationPicker"

function App() {
  const [secondsLeft, setSecondsLeft]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(25 * 60)

  useEffect(() => {
    if (secondsLeft <= 0) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsLeft])

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
          <ButtonPrimary />
        </main>
      </div>
    </>
  )
}

export default App
