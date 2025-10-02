import { useState, useEffect } from 'react'

interface UseLoadingOptions {
  initialProgress?: number
  autoIncrement?: boolean
  incrementSpeed?: number
  maxProgress?: number
}

export function useLoading(options: UseLoadingOptions = {}) {
  const {
    initialProgress = 0,
    autoIncrement = true,
    incrementSpeed = 1,
    maxProgress = 100
  } = options

  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(initialProgress)

  useEffect(() => {
    if (!autoIncrement) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= maxProgress) {
          clearInterval(interval)
          return maxProgress
        }
        return prev + incrementSpeed
      })
    }, 50) // Update every 50ms

    return () => clearInterval(interval)
  }, [autoIncrement, incrementSpeed, maxProgress])

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
    if (!loading) {
      setProgress(100)
    }
  }

  const setProgressValue = (value: number) => {
    setProgress(Math.min(Math.max(value, 0), 100))
  }

  const reset = () => {
    setIsLoading(true)
    setProgress(initialProgress)
  }

  return {
    isLoading,
    progress,
    setLoading,
    setProgressValue,
    reset
  }
}

