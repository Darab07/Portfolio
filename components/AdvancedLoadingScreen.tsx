'use client'

import { useEffect, useState } from 'react'

interface AdvancedLoadingScreenProps {
  progress?: number
  isVisible?: boolean
  onComplete?: () => void
  message?: string
  showPercentage?: boolean
  duration?: number
}

export default function AdvancedLoadingScreen({ 
  progress = 0, 
  isVisible = true, 
  onComplete,
  message = "Loading...",
  showPercentage = true,
  duration = 3000
}: AdvancedLoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    // Auto-increment progress if not provided
    const targetProgress = progress > 0 ? progress : 100
    const incrementSpeed = targetProgress / (duration / 50) // Update every 50ms

    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval)
          setIsComplete(true)
          if (onComplete) {
            setTimeout(onComplete, 500) // Small delay before calling onComplete
          }
          return targetProgress
        }
        return Math.min(prev + incrementSpeed, targetProgress)
      })
    }, 50)

    return () => clearInterval(interval)
  }, [progress, isVisible, onComplete, duration])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gray-200 flex flex-col justify-end">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-300">
        <div 
          className="h-full bg-black transition-all duration-300 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      
      {/* Percentage Display */}
      <div className="absolute bottom-4 right-4">
        {showPercentage && (
          <span className="text-black text-2xl font-medium" style={{ fontFamily: 'FT Regola Neue Trial, sans-serif' }}>
            {Math.round(displayProgress)}%
          </span>
        )}
      </div>
    </div>
  )
}
