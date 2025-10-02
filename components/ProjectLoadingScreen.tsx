'use client'

import { useEffect, useState } from 'react'

interface ProjectLoadingScreenProps {
  isVisible: boolean
  progress: number
  projectName?: string
}

export default function ProjectLoadingScreen({ 
  isVisible, 
  progress,
  projectName = "Project"
}: ProjectLoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setDisplayProgress(0)
      return
    }

    // Smooth progress animation
    const targetProgress = Math.min(Math.max(progress, 0), 100)
    
    if (displayProgress < targetProgress) {
      const increment = Math.max(1, (targetProgress - displayProgress) / 10)
      const timer = setTimeout(() => {
        setDisplayProgress(prev => Math.min(prev + increment, targetProgress))
      }, 16) // ~60fps
      
      return () => clearTimeout(timer)
    }
  }, [progress, isVisible, displayProgress])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gray-200 flex flex-col justify-end">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-300">
        <div 
          className="h-full bg-black transition-all duration-100 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      
      {/* Percentage Display */}
      <div className="absolute bottom-4 right-4">
        <span className="text-black text-2xl font-medium" style={{ fontFamily: 'FT Regola Neue Trial, sans-serif' }}>
          {Math.round(displayProgress)}%
        </span>
      </div>

      {/* Optional project name */}
      {projectName && (
        <div className="absolute bottom-4 left-4">
          <span className="text-black text-lg font-light" style={{ fontFamily: 'FT Regola Neue Trial, sans-serif' }}>
            Loading {projectName}...
          </span>
        </div>
      )}
    </div>
  )
}
