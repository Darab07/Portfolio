"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const lastScrollYRef = useRef(0)
  const isHeaderVisibleRef = useRef(true)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showMenuContent, setShowMenuContent] = useState(false)

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/mdarabkhan02/new-meeting'});
    } else {
      // Fallback: open in new tab
      window.open('https://calendly.com/mdarabkhan02/new-meeting', '_blank');
    }
  }

  useEffect(() => {
    // Initialize header position
    if (headerRef.current) {
      headerRef.current.style.transform = "translateY(0)"
      headerRef.current.style.transition = "transform 0.3s ease-out"
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollYRef.current)

      if (scrollDifference < 5) return

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        // Scrolling down - hide header
        if (isHeaderVisibleRef.current && headerRef.current) {
          isHeaderVisibleRef.current = false
          headerRef.current.style.transform = "translateY(-100%)"
        }
      } else if (currentScrollY < lastScrollYRef.current) {
        // Scrolling up - show header
        if (!isHeaderVisibleRef.current && headerRef.current) {
          isHeaderVisibleRef.current = true
          headerRef.current.style.transform = "translateY(0)"
        }
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen && !isClosing) {
      // Force reflow to ensure the element starts from the top
      const timer = setTimeout(() => {
        setShowMenuContent(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isMobileMenuOpen, isClosing])

  const handleNameClick = () => {
    router.push("/")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const closeMobileMenu = () => {
    setShowMenuContent(false)
    setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => {
        setIsMobileMenuOpen(false)
        setIsClosing(false)
        setShowMenuContent(false)
      }, 500)
    }, 200)
  }

  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>

      <header ref={headerRef} className="fixed top-0 left-0 w-full z-[9999] flex items-center justify-between px-6 md:px-12 py-6 md:py-14 mix-blend-difference max-w-full overflow-x-hidden">
        {/* Logo - Always visible */}
        <div
          className="flex flex-col font-newhouse cursor-pointer hover:opacity-80 transition-all duration-300 text-white"
          onClick={handleNameClick}
        >
          <div className="font-light tracking-tight text-xl md:text-2xl">Darab Khan</div>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <nav className="flex items-center gap-20">
            <a 
              href="/work" 
              onMouseEnter={() => setHoveredItem('work')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`transition-all duration-300 cursor-pointer text-3xl ${
                hoveredItem === 'work' || hoveredItem === null
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              Work
            </a>
            <a 
              href="/services" 
              onMouseEnter={() => setHoveredItem('services')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`transition-all duration-300 cursor-pointer text-3xl ${
                hoveredItem === 'services' || hoveredItem === null
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              Services
            </a>
            <a 
              href="/about" 
              onMouseEnter={() => setHoveredItem('about')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`transition-all duration-300 cursor-pointer text-3xl ${
                hoveredItem === 'about' || hoveredItem === null
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              About
            </a>
          </nav>
        </div>

        {/* Desktop Book a meeting - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-3 h-3 rounded-full transition-all duration-300 animate-blink bg-white"></div>
          <a 
            href="https://calendly.com/mdarabkhan02/new-meeting"
            onClick={(e) => {
              e.preventDefault();
              openCalendly();
            }}
            className="hover:opacity-70 transition-all duration-300 cursor-pointer text-2xl text-white"
          >
            Book a meeting
          </a>
        </div>

        {/* Mobile Hamburger Menu - Only visible on mobile */}
            <button
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
              onClick={() => {
                if (isMobileMenuOpen) {
                  closeMobileMenu()
                } else {
                  setIsMobileMenuOpen(true)
                }
              }}
            >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </header>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div 
              className={`fixed inset-0 z-[9998] bg-black md:hidden transition-all duration-500 ease-out ${
                isClosing ? '-translate-y-full' : 'translate-y-0'
              }`}
              style={{
                transform: isClosing ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 500ms ease-out'
              }}
              onClick={closeMobileMenu}
            >
              <div className="flex flex-col items-start justify-center h-full text-white p-8">
                <div 
                  className={`flex flex-col space-y-12 text-left transition-all duration-300 ${
                    showMenuContent && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <a 
                    href="/work" 
                    className="text-4xl font-light hover:opacity-70 transition-all duration-300 hover:scale-105"
                    onClick={closeMobileMenu}
                  >
                    Work
                  </a>
                  <a 
                    href="/services" 
                    className="text-4xl font-light hover:opacity-70 transition-all duration-300 hover:scale-105"
                    onClick={closeMobileMenu}
                  >
                    Services
                  </a>
                  <a 
                    href="/about" 
                    className="text-4xl font-light hover:opacity-70 transition-all duration-300 hover:scale-105"
                    onClick={closeMobileMenu}
                  >
                    About
                  </a>
                  <a 
                    href="https://calendly.com/mdarabkhan02/new-meeting"
                    onClick={(e) => {
                      e.preventDefault();
                      openCalendly();
                      closeMobileMenu();
                    }}
                    className="text-4xl font-light hover:opacity-70 transition-all duration-300 hover:scale-105"
                  >
                    Book a meeting
                  </a>
                </div>
              </div>
            </div>
          )}
    </>
  )
}
