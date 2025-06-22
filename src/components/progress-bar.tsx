import { useEffect, useState } from "react"

export function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
      <div
        className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-100 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </div>
  )
}
