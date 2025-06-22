import type React from "react"

interface AudioProgressProps {
  currentTime: number
  duration: number
  progress: number
  onSeek?: (time: number) => void
}

export function AudioProgress({ currentTime, duration, progress, onSeek }: AudioProgressProps) {
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00"
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickedTime = (clickX / width) * duration

    onSeek(clickedTime)
  }

  return (
    <div className="flex-1">
      <div
        className="w-full bg-secondary rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-200"
        onClick={handleProgressClick}
      >
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
