'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  progress?: number
  isVisible?: boolean
  onComplete?: () => void
}

export default function LoadingScreen({ 
  progress = 0, 
  isVisible = true, 
  onComplete 
}: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    // Animate progress bar
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= progress) {
          clearInterval(interval)
          if (progress >= 100 && onComplete) {
            setTimeout(onComplete, 500) // Small delay before calling onComplete
          }
          return progress
        }
        return prev + 1
      })
    }, 20) // Adjust speed as needed

    return () => clearInterval(interval)
  }, [progress, isVisible, onComplete])

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
        <span className="text-black text-2xl font-medium" style={{ fontFamily: 'FT Regola Neue Trial, sans-serif' }}>
          {Math.round(displayProgress)}%
        </span>
      </div>
    </div>
  )
}
