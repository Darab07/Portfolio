"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import Header from "@/components/Header"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const pakistanHeadlineRef = useRef<HTMLHeadingElement>(null)
  const bookMeetingButtonRef = useRef<HTMLButtonElement>(null)
  const scrollTextRef = useRef<HTMLDivElement>(null)
  const visualIdentityRef = useRef<HTMLHeadingElement>(null)
  const foundationRef = useRef<HTMLHeadingElement>(null)
  const servicesRef = useRef<HTMLHeadingElement>(null)
  const websiteDesignRef = useRef<HTMLHeadingElement>(null)
  const takeNextStepRef = useRef<HTMLHeadingElement>(null)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/mdarabkhan02/new-meeting'});
    } else {
      // Fallback: open in new tab
      window.open('https://calendly.com/mdarabkhan02/new-meeting', '_blank');
    }
  }
  const koderusHeadingRef = useRef<HTMLHeadingElement>(null)
  const wideWingsHeadingRef = useRef<HTMLHeadingElement>(null)
  const extricaHeadingRef = useRef<HTMLHeadingElement>(null)
  const aznHeadingRef = useRef<HTMLHeadingElement>(null)
  const oliverCabellHeadingRef = useRef<HTMLHeadingElement>(null)
  const router = useRouter()
  
  const foundationCards = [
    {
      id: 1,
      number: "01.",
      title: "Brief us",
      description: "Provide your project details for us to better align our web design, development, and brand identity design services with your needs.",
      hasButton: true
    },
    {
      id: 2,
      number: "02.",
      title: "Meet us online",
      description: "Share your project information so we can accurately adjust our web design and development services to suit your requirements.",
      hasButton: false
    },
    {
      id: 3,
      number: "03.",
      title: "Free estimation",
      description: "Receive a detailed estimate from us, designed to provide a clear overview of the costs tailored to your project's unique requirements.",
      hasButton: false
    },
    {
      id: 4,
      number: "04.",
      title: "Work together",
      description: "Collaborate closely with us to efficiently and effectively turn your project vision into reality, ensuring comprehensive success.",
      hasButton: false
    }
  ]

  const nextCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentCardIndex((prev) => (prev + 1) % foundationCards.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentCardIndex((prev) => (prev - 1 + foundationCards.length) % foundationCards.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const goToCard = (index: number) => {
    if (isAnimating || index === currentCardIndex) return
    setIsAnimating(true)
    setCurrentCardIndex(index)
    setTimeout(() => setIsAnimating(false), 300)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Ensure video autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }

    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    const projectHeadings = [
      koderusHeadingRef.current,
      wideWingsHeadingRef.current,
      extricaHeadingRef.current,
      aznHeadingRef.current,
      oliverCabellHeadingRef.current,
    ]

    projectHeadings.forEach((heading) => {
      if (heading) {
        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })

    if (pakistanHeadlineRef.current) {
      gsap.fromTo(
        pakistanHeadlineRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pakistanHeadlineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Foundation section animation
    if (foundationRef.current) {
      gsap.fromTo(
        foundationRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: foundationRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Services section animation
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Visual identity section animation
    if (visualIdentityRef.current) {
      gsap.fromTo(
        visualIdentityRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: visualIdentityRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Website design section animation
    if (websiteDesignRef.current) {
      gsap.fromTo(
        websiteDesignRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: websiteDesignRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Take next step section animation
    if (takeNextStepRef.current) {
      gsap.fromTo(
        takeNextStepRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: takeNextStepRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <section className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0 max-w-full">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/images/Background-Animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/30"></div>

        <Header />

        {/* Centered Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white max-w-4xl px-12">
            <h1 ref={headlineRef} className="text-3xl md:text-4xl font-light leading-tight mb-12 tracking-[-0.075em]">
            <span className="inline-block">Branding and web design,</span>
            <br />
            <span className="inline-block">driven by strategy & innovation.</span>
          </h1>
            <p className="text-lg md:text-lg font-light mb-8 text-gray-200">
              Mohammad Darab Khan
            </p>
            <div className="flex justify-center">
              <a 
                href="https://calendly.com/mdarabkhan02/new-meeting"
                onClick={(e) => {
                  e.preventDefault();
                  openCalendly();
                }}
                className="bg-white hover:bg-gray-100 text-black px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-base font-medium transition-all duration-300 cursor-pointer"
              >
                Book a meeting
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mt-[100vh] px-6 md:px-12 py-16 md:py-32 bg-white max-w-full overflow-x-hidden">
      </main>

      <section className="relative z-20 px-6 md:px-12 bg-white pb-[120px] -mt-8 md:-mt-30 max-w-full overflow-x-hidden">
        {/* Project Cards Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-4xl font-light leading-tight tracking-[-0.075em] text-black mb-4">
            <span className="block md:hidden">
            Showcasing Work
              <br />
              That Tells a Story
            </span>
            <span className="hidden md:block">
              Showcasing Work
              <br />
              That Tells a Story
            </span>
          </h2>
        </div>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="relative bg-gray-200 rounded-lg overflow-hidden h-[600px] md:h-[1000px] cursor-pointer"
            onClick={() => router.push("/projects/stonexis")}
          >
            <Image
              src="/images/stonexis/Laptop.jpg"
              alt="Stonexis project showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6">
              <h3 ref={koderusHeadingRef} className="font-light text-white text-4xl md:text-2xl">
                Stonexis
              </h3>
            </div>
            <div className="absolute bottom-6 left-6 flex gap-3">
              <button className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                Web design
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                Development
              </button>
            </div>
            <div className="preview-overlay absolute top-8 left-8 right-8 bottom-8 opacity-0 scale-75 pointer-events-none flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-[2000/1192]">
                <Image
                  src="/images/stonexis/Phone Mockup.jpg"
                  alt="Stonexis Homepage Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div 
            className="relative bg-black rounded-lg overflow-hidden h-[600px] md:h-[1000px] cursor-pointer"
            onClick={() => router.push("/projects/aurelia")}
          >
            <Image
              src="/images/aurelia/Laptop.jpg"
              alt="Aurelia Hotel project showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
              <h3 ref={wideWingsHeadingRef} className="font-light text-white text-4xl md:text-2xl">
                Aurelia Hotel{" "}
              </h3>
            </div>
            <div className="absolute bottom-6 left-6 flex gap-3">
              <button className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                Branding
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                Web design
              </button>
            </div>
            <div className="preview-overlay absolute top-8 left-8 right-8 bottom-8 opacity-0 scale-75 pointer-events-none flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-[2000/1192]">
                <Image
                  src="/images/aurelia/Iphone Pockup.jpg"
                  alt="Aurelia Hotel Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div 
            className="relative bg-green-800 rounded-lg overflow-hidden h-[600px] md:h-[1000px] cursor-pointer"
            onClick={() => router.push("/projects/nexora")}
          >
            <Image
              src="/images/nexora/Laptop Mockup.jpg"
              alt="Nexora project showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
              <h3 ref={extricaHeadingRef} className="font-light text-white text-4xl md:text-2xl">
                Nexora
              </h3>
            </div>
            <div className="absolute bottom-6 left-6 flex gap-3">
              <button className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                Branding
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                Strategy
              </button>
            </div>
            <div className="preview-overlay absolute top-8 left-8 right-8 bottom-8 opacity-0 scale-75 pointer-events-none flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-[2000/1192]">
                <Image
                  src="/images/nexora/Iphone Mockup.jpg"
                  alt="Nexora Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div 
            className="relative bg-blue-900 rounded-lg overflow-hidden h-[600px] md:h-[1000px] cursor-pointer"
            onClick={() => router.push("/projects/lza")}
          >
            <Image
              src="/images/lza/Laptop Mockup.jpg"
              alt="LZA Architecture project showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
              <h3 ref={aznHeadingRef} className="font-light text-white text-4xl md:text-2xl">
                LZA Architecture{" "}
              </h3>
            </div>
            <div className="absolute bottom-6 left-6 flex gap-3">
              <button className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                Development
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                UI/UX
              </button>
            </div>
            <div className="preview-overlay absolute top-8 left-8 right-8 bottom-8 opacity-0 scale-75 pointer-events-none flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-[2000/1192]">
                <Image
                  src="/images/lza/Mobile Mockup.jpg"
                  alt="LZA Architecture Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div 
            className="relative bg-purple-900 rounded-lg overflow-hidden h-[600px] md:h-[1000px] cursor-pointer"
            onClick={() => router.push("/projects/kickflips")}
          >
            <Image
              src="/images/kickflips/Laptop Mockup.jpg"
              alt="KickFlips project showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
              <h3 ref={oliverCabellHeadingRef} className="font-light text-white text-4xl md:text-2xl">
                KickFlips{" "}
              </h3>
            </div>
            <div className="absolute bottom-6 left-6 flex gap-3">
              <button className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                E-commerce
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                Branding
              </button>
            </div>
            <div className="preview-overlay absolute top-8 left-8 right-8 bottom-8 opacity-0 scale-75 pointer-events-none flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-[2000/1192]">
                <Image
                  src="/images/kickflips/Phone Mockup.jpg"
                  alt="KickFlips Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-white pb-20 max-w-full overflow-x-hidden">
        <div className="w-full px-6 md:px-12">
          <h2 ref={foundationRef} className="font-light leading-tight tracking-[-0.075em] text-black mb-16 text-4xl md:text-5xl">
            <span className="block md:hidden">
              Setting the
              <br />
              Foundation for your
              <br />
              project success
            </span>
            <span className="hidden md:block">
              Setting the foundation for
              <br />
              your project success.
            </span>
          </h2>

          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-4 gap-8 mt-20">
            {/* Step 01 */}
            <div className="border-l border-gray-200 pl-8">
              <div className="text-gray-400 text-sm font-medium mb-4">01.</div>
              <h3 className="text-2xl md:text-xl font-light text-black mb-6">Brief me</h3>
              <p className="text-gray-600 text-base md:text-sm leading-relaxed mb-8">
                Provide your project details for me to better align my web design, development, and brand identity
                design services with your needs.
              </p>
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Step 02 */}
            <div className="border-l border-gray-200 pl-8">
              <div className="text-gray-400 text-sm font-medium mb-4">02.</div>
              <h3 className="text-2xl md:text-xl font-light text-black mb-6">Meet me online</h3>
              <p className="text-gray-600 text-base md:text-sm leading-relaxed">
                Share your project information so I can accurately adjust my web design and development services to
                suit your requirements.
              </p>
            </div>

            {/* Step 03 */}
            <div className="border-l border-gray-200 pl-8">
              <div className="text-gray-400 text-sm font-medium mb-4">03.</div>
              <h3 className="text-2xl md:text-xl font-light text-black mb-6">Free estimation</h3>
              <p className="text-gray-600 text-base md:text-sm leading-relaxed">
                Receive a detailed estimate from me, designed to provide a clear overview of the costs tailored to your   
                project's unique requirements.
              </p>
            </div>

            {/* Step 04 */}
            <div className="border-l border-gray-200 pl-8">
              <div className="text-gray-400 text-sm font-medium mb-4">04.</div>
              <h3 className="text-2xl md:text-xl font-light text-black mb-6">Work together</h3>
              <p className="text-gray-600 text-base md:text-sm leading-relaxed">
                Collaborate closely with me to efficiently and effectively turn your project vision into reality,
                ensuring comprehensive success.
              </p>
            </div>
          </div>

          {/* Mobile Carousel - Hidden on desktop */}
          <div className="md:hidden mt-12">
            <div className="relative overflow-hidden">
              {/* Card Container with Animation */}
              <div className="relative">
                <div 
                  className={`transition-all duration-300 ease-in-out transform ${
                    isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="border-l-2 border-black pl-6 mb-8">
                    <div className="text-gray-400 text-sm font-medium mb-4">
                      {foundationCards[currentCardIndex].number}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">
                      {foundationCards[currentCardIndex].title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {foundationCards[currentCardIndex].description}
                    </p>
                    {foundationCards[currentCardIndex].hasButton && (
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevCard}
                  disabled={isAnimating}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                    isAnimating 
                      ? 'bg-gray-200 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
                  }`}
                >
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {foundationCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      disabled={isAnimating}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentCardIndex 
                          ? 'bg-black scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextCard}
                  disabled={isAnimating}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                    isAnimating 
                      ? 'bg-gray-200 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
                  }`}
                >
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-black py-32 max-w-full overflow-x-hidden">
        <div className="w-full px-6 md:px-12">
          <div className="max-w-6xl">
            <h2 ref={servicesRef} className="text-4xl md:text-4xl font-light leading-tight tracking-[-0.075em] text-white">
              <span className="block md:hidden">
                My services range from designing visual identities to creating websites. This positions me uniquely between design and technology.
              </span>
              <span className="hidden md:block">
                My services range from designing visual
                <br />
                identities to creating websites. This positions
                <br />
                me uniquely between design and technology.
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full pb-20 max-w-full overflow-x-hidden" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="pt-20 pb-8">
          <h2
            ref={pakistanHeadlineRef}
            className="text-4xl md:text-4xl font-light leading-tight text-black mb-6 tracking-[-0.075em] px-6 md:px-10"
          >
            <span className="block md:hidden">
              Based in Pakistan,
              <br />
              working worldwide
            </span>
            <span className="hidden md:block">
              <span className="inline-block">Based</span> <span className="inline-block">in</span>{" "}
              <span className="inline-block">Pakistan,</span>
              <br />
              <span className="inline-block">working</span> <span className="inline-block">worldwide</span>
            </span>
          </h2>
          <div className="flex items-center gap-4 px-10">
            <a 
              href="https://calendly.com/mdarabkhan02/new-meeting"
              onClick={(e) => {
                e.preventDefault();
                openCalendly();
              }}
              className="bg-white hover:bg-gray-50 text-black px-6 py-2 rounded-full text-base font-medium border border-gray-200 shadow-sm inline-block cursor-pointer"
            >
              Book a meeting
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center mt-16 px-6 md:px-12">
          <div className="w-full max-w-6xl aspect-[1899/825]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-25%20150120-9uWtWX4rLG5ncngCWkfeUtecFSucVe.png"
              alt="Brand showcase with abstract circular patterns"
              className="w-full h-full object-cover rounded-lg scale-110 md:scale-100"
            />
          </div>
        </div>

        
      </section>

      <section className="relative z-10 w-full bg-black py-8 md:py-16 max-w-full overflow-x-hidden">
        <div className="w-full px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left side - Title */}
            <div className="md:w-1/2">
              <div className="md:sticky md:top-24 mt-8 md:-mt-8">
                <h2 ref={visualIdentityRef} className="text-4xl md:text-4xl font-light leading-tight tracking-[-0.075em] text-white">
                  <span className="block md:hidden">
                  Visual identity
                    <br />
                    design
                  </span>
                  <span className="hidden md:block">
                    Visual identity
                    <br />
                    design
                  </span>
                </h2>
              </div>
            </div>

            {/* Right side - Description paragraphs */}
            <div className="md:w-1/2 space-y-8 mt-12 md:mt-8">
              <p className="text-white text-lg md:text-base leading-relaxed">
                Gain a competitive edge, enhance your brand perception, and achieve brand clarity.
              </p>

              <p className="text-lg md:text-base leading-relaxed text-gray-500">
                Your identity drives change, increases the value of your company, and contributes to your organization
                to move faster and more efficiently.
              </p>

              <p className="text-lg md:text-base leading-relaxed text-gray-500">
                A professional corporate identity attracts the attention of potential customers and makes your business
                a preferred choice. A well-defined and consistent brand conveys professionalism, and positively impacts
                customer loyalty and influences premium-brand perception.
              </p>

              <div className="mt-12">
                <img
                  src="/images/nexora/Card Mockup.jpg"
                  alt="Nexora card mockup - visual identity design showcase"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="mt-16">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">SERVICES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-5 py-0">
                  <div className="space-y-4">
                    <p className="text-white text-lg md:text-base leading-4">Visual identity design</p>
                    <p className="text-white text-lg md:text-base leading-4">Logo design</p>
                    <p className="text-white text-lg md:text-base leading-4">Brand strategy</p>
                    <p className="text-white text-lg md:text-base leading-4">Market research</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white text-lg md:text-base leading-4">UX audit</p>
                    <p className="text-white text-lg md:text-base leading-4">Information architecture</p>
                    <p className="text-white text-lg md:text-base leading-4">Comparative analysis</p>
                    <p className="text-white text-lg md:text-base leading-4">Brand messaging</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-white py-16 md:py-20 max-w-full overflow-x-hidden">
        <div className="w-full px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left side - Title */}
            <div className="md:w-1/2">
              <div className="md:sticky md:top-24 -mt-4 md:-mt-8">
                <h2 ref={websiteDesignRef} className="text-4xl md:text-4xl font-light leading-tight tracking-[-0.075em] text-black">
                  <span className="block md:hidden">
                    Website design & development
                  </span>
                  <span className="hidden md:block">
                    Website design
                    <br />& development
                  </span>
                </h2>
              </div>
            </div>

            {/* Right side - Description paragraphs */}
            <div className="md:w-1/2 space-y-8 mt-12 md:mt-8">
              <p className="text-black text-lg md:text-base leading-relaxed">
                Generate leads & engagement, showcase expertise and credability, and stand out & differentiate.
              </p>

              <p className="text-lg md:text-base leading-relaxed text-gray-500">
                Your website should enable easy access to inform, maintain trustworthiness and move buyers towards the
                sale. A high-quality website can help you engage with your visitors, encouraging them to learn more
                about your business and take action. A modern and beautiful digital presence can be a clear
                differentiator and create a memorable first impression.
              </p>

              <div className="mt-12">
                <img
                  src="/images/nexora/Iphone Mockup.jpg"
                  alt="Nexora website displayed on mobile phone showing clean, minimal design"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="mt-16">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">SERVICES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-5 py-0">
                  <div className="space-y-4">
                    <p className="text-black text-lg md:text-base leading-4">Marketing websites</p>
                    <p className="text-black text-lg md:text-base leading-4">UX/UI design</p>
                    <p className="text-black text-lg md:text-base leading-4">Digital products</p>
                    <p className="text-black text-lg md:text-base leading-4">Mobile apps</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-black text-lg md:text-base leading-4">Prototyping & testing</p>
                    <p className="text-black text-lg md:text-base leading-4">Illustrations</p>
                    <p className="text-black text-lg md:text-base leading-4">Mobile apps</p>
                    <p className="text-black text-lg md:text-base leading-4">Animations & interactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full py-16 md:py-32 max-w-full overflow-x-hidden" style={{ backgroundColor: "#F6F6F6" }}>
        <div className="w-full px-6 md:px-12">
          {/* Full-width heading and divider */}
          <div className="max-w-4xl">
              <h2 ref={takeNextStepRef} className="text-4xl md:text-4xl font-light leading-tight tracking-[-0.075em] text-black">
                <span className="block md:hidden">
                  Take the next step
                  <br />
                  with me
                </span>
                <span className="hidden md:block">
                  Take the next
                  <br />
                  step with me
                </span>
              </h2>
          </div>
          <div className="space-y-6 mt-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    CONNECT FOR COLLABORATION
                  </h3>
                </div>
                <div className="w-full h-px bg-gray-300"></div>
              </div>

          {/* Two cards in the same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch mt-12">
            <div className="bg-white rounded-lg p-8 shadow-sm h-full min-h-[200px]">
              <p className="text-black text-lg md:text-base leading-relaxed mb-[60px]">
                  Book a time for a short call to discuss the possibilities of working together.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src="/professional-headshot-of-vilius-vaicius.png"
                        alt="Vilius Vaicius"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-lg md:text-base">M. Darab Khan</h4>
                    </div>
                  </div>

                  <a 
                    href="https://calendly.com/mdarabkhan02/new-meeting"
                    onClick={(e) => {
                      e.preventDefault();
                      openCalendly();
                    }}
                    className="bg-white hover:bg-gray-50 text-black px-6 py-2 rounded-full text-base font-medium border border-gray-200 shadow-sm inline-block cursor-pointer w-full md:w-auto text-center"
                  >
                    Book a meeting
                  </a>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm h-full min-h-[200px]">
                <p className="text-lg md:text-base leading-relaxed text-gray-500 mb-[60px]">Contact</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-lg md:text-base">M. Darab Khan</h4>
                      <p className="text-gray-500 text-sm md:text-xs">mdarabkhan02@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
