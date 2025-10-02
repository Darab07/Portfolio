'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface UseProjectNavigationOptions {
  onNavigationStart?: () => void
  onNavigationComplete?: () => void
}

// Project image mappings - same as the working system uses
const projectImages: { [key: string]: string[] } = {
  stonexis: [
    '/images/stonexis/Laptop.jpg',
    '/images/stonexis/Screenshot 2025-09-19 162048.png',
    '/images/stonexis/Landing Page.png',
    '/images/stonexis/Quote.png',
    '/images/stonexis/About Page.png',
    '/images/stonexis/Product Page.png',
    '/images/stonexis/FAQs.png',
    '/images/stonexis/Custom Solution Page.png',
    '/images/stonexis/Projects.png',
    '/images/stonexis/Phone Mockup.jpg',
    '/images/stonexis/Cards.jpg',
    '/images/stonexis/Type Pairing.png',
    '/images/stonexis/Color.gif'
  ],
  aurelia: [
    '/images/aurelia/Laptop.jpg',
    '/images/aurelia/Book Room.png',
    '/images/aurelia/Main Page.png',
    '/images/aurelia/Room Page.png',
    '/images/aurelia/Room Selection.png',
    '/images/aurelia/Contact Page.png',
    '/images/aurelia/Contact Form.png',
    '/images/aurelia/Conference.png',
    '/images/aurelia/Option Page - 1.png',
    '/images/aurelia/Phone Frames.png',
    '/images/aurelia/Iphone Pockup.jpg',
    '/images/aurelia/Card Mockup.jpg',
    '/images/aurelia/Type Pairing.png',
    '/images/aurelia/Color.gif'
  ],
  nexora: [
    '/images/nexora/Laptop Mockup.jpg',
    '/images/nexora/Conference Event Page.png',
    '/images/nexora/Landing Page.png',
    '/images/nexora/Main Conference Page.png',
    '/images/nexora/Overview Page.png',
    '/images/nexora/Settings Page.png',
    '/images/nexora/Mechnical Page.png',
    '/images/nexora/Journals Page.png',
    '/images/nexora/Iphone Mockup.jpg',
    '/images/nexora/Card Mockup.jpg',
    '/images/nexora/Type Pairing.png',
    '/images/nexora/Color.gif'
  ],
  lza: [
    '/images/lza/Laptop Mockup.jpg',
    '/images/lza/Landing Page.png',
    '/images/lza/Hero Section.png',
    '/images/lza/About Me Section.png',
    '/images/lza/Projects Section.png',
    '/images/lza/Enquiry Section.png',
    '/images/lza/Enquiry Section 2.png',
    '/images/lza/Mobile Mockup.jpg',
    '/images/lza/Mobile Frame.png',
    '/images/lza/Card Mockup.jpg',
    '/images/lza/Type Pairing.png'
  ],
  kickflips: [
    '/images/kickflips/Laptop Mockup.jpg',
    '/images/kickflips/Store Page.png',
    '/images/kickflips/Product Page.png',
    '/images/kickflips/Catalog Page.png',
    '/images/kickflips/Filter Page.png',
    '/images/kickflips/Details & Care Section.png',
    '/images/kickflips/Manufacturing Page.png',
    '/images/kickflips/Our Story Page.png',
    '/images/kickflips/Menu Page.png',
    '/images/kickflips/Mobile Layout.png',
    '/images/kickflips/Phone Mockup.jpg',
    '/images/kickflips/Card Mockup.jpg',
    '/images/kickflips/Type Pairing.png'
  ]
}

export function useProjectNavigation(options: UseProjectNavigationOptions = {}) {
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [targetProject, setTargetProject] = useState<string | null>(null)
  const router = useRouter()

  const navigateToProject = useCallback((projectId: string) => {
    if (isNavigating) return

    setIsNavigating(true)
    setTargetProject(projectId)
    setProgress(0)
    options.onNavigationStart?.()

    // Use the same logic as the working initial page loading system
    const trackProjectLoading = () => {
      const imageUrls = projectImages[projectId] || []
      
      if (imageUrls.length === 0) {
        // No images to preload, navigate immediately
        setProgress(100)
        setTimeout(() => {
          router.push(`/projects/${projectId}`)
          setIsNavigating(false)
          setTargetProject(null)
          setProgress(0)
          options.onNavigationComplete?.()
        }, 300)
        return
      }

      let loadedCount = 0
      let currentProgress = 0

      const updateProgress = () => {
        loadedCount++
        currentProgress = Math.round((loadedCount / imageUrls.length) * 100)
        setProgress(currentProgress)

        if (loadedCount >= imageUrls.length) {
          // All images loaded, navigate
          setTimeout(() => {
            router.push(`/projects/${projectId}`)
            setIsNavigating(false)
            setTargetProject(null)
            setProgress(0)
            options.onNavigationComplete?.()
          }, 300)
        }
      }

      // Preload images exactly like the working system
      imageUrls.forEach(url => {
        const img = new Image()
        img.onload = updateProgress
        img.onerror = updateProgress // Count errors as loaded to prevent hanging
        img.src = url
      })

      // Fallback timeout in case some images don't load
      setTimeout(() => {
        if (currentProgress < 100) {
          setProgress(100)
          setTimeout(() => {
            router.push(`/projects/${projectId}`)
            setIsNavigating(false)
            setTargetProject(null)
            setProgress(0)
            options.onNavigationComplete?.()
          }, 300)
        }
      }, 8000) // Same timeout as working system
    }

    // Start tracking after a short delay to allow state to update
    setTimeout(trackProjectLoading, 100)
  }, [isNavigating, router, options])

  const cancelNavigation = useCallback(() => {
    setIsNavigating(false)
    setTargetProject(null)
    setProgress(0)
  }, [])

  return {
    isNavigating,
    progress,
    targetProject,
    navigateToProject,
    cancelNavigation
  }
}
