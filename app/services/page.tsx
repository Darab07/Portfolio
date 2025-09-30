"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import Header from "@/components/Header"

export default function Services() {
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const digitalBrandingRef = useRef<HTMLHeadingElement>(null)
  const uxDesignRef = useRef<HTMLHeadingElement>(null)
  const developmentRef = useRef<HTMLHeadingElement>(null)
  const maintenanceRef = useRef<HTMLHeadingElement>(null)
  const digitalBrandingNumberRef = useRef<HTMLDivElement>(null)
  const uxDesignNumberRef = useRef<HTMLDivElement>(null)
  const developmentNumberRef = useRef<HTMLDivElement>(null)
  const maintenanceNumberRef = useRef<HTMLDivElement>(null)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/mdarabkhan02/new-meeting'});
    } else {
      // Fallback: open in new tab
      window.open('https://calendly.com/mdarabkhan02/new-meeting', '_blank');
    }
  }

  useEffect(() => {
    if (servicesTitleRef.current) {
      // Simple fade-in animation
      servicesTitleRef.current.style.opacity = '0'
      servicesTitleRef.current.style.transform = 'translateY(50px)'
      
      const timer = setTimeout(() => {
        if (servicesTitleRef.current) {
          servicesTitleRef.current.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out'
          servicesTitleRef.current.style.opacity = '1'
          servicesTitleRef.current.style.transform = 'translateY(0)'
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          element.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out'
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Set initial styles and observe elements
    const elementsToAnimate = [
      { ref: digitalBrandingNumberRef, delay: 0 },
      { ref: digitalBrandingRef, delay: 100 },
      { ref: uxDesignNumberRef, delay: 0 },
      { ref: uxDesignRef, delay: 100 },
      { ref: developmentNumberRef, delay: 0 },
      { ref: developmentRef, delay: 100 },
      { ref: maintenanceNumberRef, delay: 0 },
      { ref: maintenanceRef, delay: 100 }
    ]

    elementsToAnimate.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.opacity = '0'
        ref.current.style.transform = 'translateY(50px)'
        
        setTimeout(() => {
          if (ref.current) {
            observer.observe(ref.current)
          }
        }, delay)
      }
    })

    return () => {
      observer.disconnect()
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
      <Header />

      <main className="pt-24">
        {/* Services Title Section */}
        <section className="px-6 md:px-12 py-8 md:py-32">
          <div className="text-center">
            <h1 ref={servicesTitleRef} className="text-6xl md:text-7xl font-light text-black mb-8 md:mb-16 tracking-[-0.075em]">
              Services
            </h1>
          </div>
        </section>

        {/* Digital-first branding Card */}
        <section className="relative z-10 w-full bg-black py-8 md:py-32 max-w-full overflow-x-hidden">
          <div className="w-full px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
              {/* Left side - Title */}
              <div className="sticky top-24 self-start">
                <div ref={digitalBrandingNumberRef} className="text-gray-400 text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] mb-4">01</div>
                <h2 ref={digitalBrandingRef} className="text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] text-white">
                  <span className="block md:hidden">
                  Digital-first branding
                  </span>
                  <span className="hidden md:block">
                    Digital-first
                    <br />
                    branding
                  </span>
                </h2>
              </div>

              {/* Right side - Description paragraphs */}
              <div className="space-y-8 mt-12 md:mt-24">
                <p className="text-white text-lg md:text-base leading-relaxed">
                  I craft brand identities built for the web first, then scale them across every touchpoint. Through research and strategy, I define a visual system that reflects your values and positioning.
                </p>

                <p className="text-lg md:text-base leading-relaxed text-gray-500">
                  The outcome is a modern, consistent presence that feels clear, credible, and instantly recognizable.
                </p>

                <div className="mt-12">
                  <img
                    src="/images/lza/Laptop Mockup.jpg"
                    alt="Digital-first branding showcase"
                    className="w-full h-[32rem] object-cover rounded-lg"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">SERVICES</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-5 py-0">
                    <div className="space-y-4">
                      <p className="text-white text-lg md:text-base leading-4">Visual identity design</p>
                      <p className="text-white text-lg md:text-base leading-4">Logo design</p>
                      <p className="text-white text-lg md:text-base leading-4">Brand guidelines</p>
                      <p className="text-white text-lg md:text-base leading-4">Brand strategy</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-white text-lg md:text-base leading-4">Brand messaging</p>
                      <p className="text-white text-lg md:text-base leading-4">Competitive analysis</p>
                      <p className="text-white text-lg md:text-base leading-4">Market research</p>
                      <p className="text-white text-lg md:text-base leading-4">Social media kit</p>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UX/UI design Card */}
        <section className="relative z-10 w-full bg-white py-16 md:py-32 max-w-full overflow-x-hidden">
          <div className="w-full px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left side - Title */}
              <div className="sticky top-24 self-start">
                <div ref={uxDesignNumberRef} className="text-gray-400 text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] mb-4">02</div>
                <h2 ref={uxDesignRef} className="text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] text-black">
                  <span className="block md:hidden">
                    UX/UI design
                  </span>
                  <span className="hidden md:block">
                  UX/UI design
                  </span>
                </h2>
              </div>

              {/* Right side - Description paragraphs */}
              <div className="space-y-8 mt-12 md:mt-24">
                <p className="text-black text-lg md:text-base leading-relaxed">
                  I design intuitive, human-centered interfaces with clear information architecture and purposeful interactions. My process moves from discovery and flows to wireframes, high-fidelity designs, and prototypes.
                </p>

                <p className="text-lg md:text-base leading-relaxed text-gray-500">
                  Every decision balances usability, accessibility, and conversion—so the experience looks great and works even better.
                </p>

                <div className="mt-12">
                  <img
                    src="/images/aurelia/Phone Frames.png"
                    alt="UX/UI design showcase"
                    className="w-full h-[32rem] object-cover rounded-lg"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">SERVICES</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-5 py-0">
                    <div className="space-y-4">
                      <p className="text-black text-lg md:text-base leading-4">Information architecture</p>
                      <p className="text-black text-lg md:text-base leading-4">Wireframing</p>
                      <p className="text-black text-lg md:text-base leading-4">Prototyping</p>
                      <p className="text-black text-lg md:text-base leading-4">UX/UI design</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-black text-lg md:text-base leading-4">Interaction design</p>
                      <p className="text-black text-lg md:text-base leading-4">UX/UI audit</p>
                      <p className="text-black text-lg md:text-base leading-4">Responsive design</p>
                      <p className="text-black text-lg md:text-base leading-4">Marketing websites</p>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Card */}
        <section className="relative z-10 w-full bg-black py-8 md:py-32 max-w-full overflow-x-hidden">
          <div className="w-full px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
              {/* Left side - Title */}
              <div className="sticky top-24 self-start">
                <div ref={developmentNumberRef} className="text-gray-400 text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] mb-4">03</div>
                <h2 ref={developmentRef} className="text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] text-white">
                  <span className="block md:hidden">
                    Development
                  </span>
                  <span className="hidden md:block">
                  Development
                  </span>
                </h2>
              </div>

              {/* Right side - Description paragraphs */}
              <div className="space-y-8 mt-12 md:mt-24">
                <p className="text-white text-lg md:text-base leading-relaxed">
                  I translate polished designs into fast, responsive websites you can update yourself. Clean structure, thoughtful animations, and strong performance are baked in from the start.
                </p>

                <p className="text-lg md:text-base leading-relaxed text-gray-500">
                  Whether Webflow or WordPress, the build is maintainable, SEO-friendly, and ready to grow with your product.
                </p>

                <div className="mt-12">
                  <img
                    src="/images/stonexis/Phone Mockup.jpg"
                    alt="Development showcase"
                    className="w-full h-[32rem] object-cover rounded-lg"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">SERVICES</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-5 py-0">
                    <div className="space-y-4">
                      <p className="text-white text-lg md:text-base leading-4">Web development</p>
                      <p className="text-white text-lg md:text-base leading-4">E-commerce</p>
                      <p className="text-white text-lg md:text-base leading-4">CMS integration</p>
                      <p className="text-white text-lg md:text-base leading-4">API integration</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-white text-lg md:text-base leading-4">Webflow development (no-code)</p>
                      <p className="text-white text-lg md:text-base leading-4">Front-end</p>
                      <p className="text-white text-lg md:text-base leading-4">QA and testing</p>
                      <p className="text-white text-lg md:text-base leading-4">Deployment</p>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance and support Card */}
        <section className="relative z-10 w-full bg-white py-16 md:py-32 max-w-full overflow-x-hidden">
          <div className="w-full px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left side - Title */}
              <div className="sticky top-24 self-start">
                <div ref={maintenanceNumberRef} className="text-gray-400 text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] mb-4">04</div>
                <h2 ref={maintenanceRef} className="text-5xl md:text-5xl font-light leading-tight tracking-[-0.075em] text-black">
                  <span className="block md:hidden">
                  Maintenance and support
                  </span>
                  <span className="hidden md:block">
                    Maintenance
                    <br />
                    and support
                  </span>
                </h2>
              </div>

              {/* Right side - Description paragraphs */}
              <div className="space-y-8 mt-12 md:mt-24">
                <p className="text-black text-lg md:text-base leading-relaxed">
                  After launch, I keep your site healthy with proactive updates, backups, and performance checks—so you can focus on the work.
                </p>

                <p className="text-lg md:text-base leading-relaxed text-gray-500">
                  As your needs evolve, I iterate with small improvements that compound into lasting results.
                </p>

                <div className="mt-12">
                  <img
                    src="/images/nexora/Journals Page.png"
                    alt="Maintenance and support showcase"
                    className="w-full h-[32rem] object-cover rounded-lg"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">SERVICES</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-5 py-0">
                    <div className="space-y-4">
                      <p className="text-black text-lg md:text-base leading-4">Backups</p>
                      <p className="text-black text-lg md:text-base leading-4">Plugin/CMS updates</p>
                      <p className="text-black text-lg md:text-base leading-4">Hosting</p>
                      <p className="text-black text-lg md:text-base leading-4">Security</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-black text-lg md:text-base leading-4">Troubleshooting</p>
                      <p className="text-black text-lg md:text-base leading-4">Bug fixes</p>
                      <p className="text-black text-lg md:text-base leading-4">Performance optimization</p>
                      <p className="text-black text-lg md:text-base leading-4">Content updates</p>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="relative z-10 w-full py-16 md:py-32 max-w-full overflow-x-hidden" style={{ backgroundColor: "#F6F6F6" }}>
          <div className="w-full px-6 md:px-12">
            {/* Full-width heading and divider */}
            <div className="max-w-4xl">
                <h2 className="text-4xl md:text-4xl font-light leading-tight tracking-[-0.075em] text-black">
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
                      className="bg-white hover:bg-gray-50 text-black px-6 py-2 rounded-full text-base md:text-sm font-medium border border-gray-200 shadow-sm inline-block cursor-pointer w-full md:w-auto text-center"
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
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
      </main>
    </div>
  )
}
