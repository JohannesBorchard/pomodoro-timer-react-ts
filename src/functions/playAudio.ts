export default function playAudio(audioFile: string) {
  const successAudio = new Audio(audioFile)
  successAudio.currentTime = 0
  successAudio.play().catch(() => {})
}
