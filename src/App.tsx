import { useState, useEffect } from "react"
import ButtonPrimary from "./components/ButtonPrimary"
import ButtonSecondary from "./components/ButtonSecondary"
import Header from "./components/Header"
import Counter from "./components/Counter"
import DurationPicker from "./components/DurationPicker"
import tickSound from "./assets/clock_tick.wav"
import successSound from "./assets/success.wav"

function App() {
  const [secondsLeft, setSecondsLeft] = useState(5)

  const [isWorking, setIsWorking] = useState(false)

  useEffect(() => {
    if (!isWorking) return

    if (secondsLeft <= 0) {
      const successAudio = new Audio(successSound)
      successAudio.currentTime = 0
      successAudio.play().catch(() => {})
      return undefined
    }

    const tickAudio = new Audio(tickSound)

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        tickAudio.currentTime = 0
        tickAudio.play().catch(() => {})
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsLeft, isWorking])

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
          {!isWorking ? (
            <ButtonPrimary onClick={() => setIsWorking(true)}>
              Start
            </ButtonPrimary>
          ) : (
            <ButtonSecondary onClick={() => setIsWorking(false)}>
              Pause
            </ButtonSecondary>
          )}
        </main>
      </div>
    </>
  )
}

export default App
