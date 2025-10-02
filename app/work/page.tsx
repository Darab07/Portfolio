"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import Header from "@/components/Header"
import LoadingScreen from "@/components/LoadingScreen"
import ProjectLoadingScreen from "@/components/ProjectLoadingScreen"
import { useProjectNavigation } from "@/hooks/useProjectNavigation"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Work() {
  const router = useRouter()
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const workTitleRef = useRef<HTMLHeadingElement>(null)
  
  // New project navigation system
  const { 
    isNavigating, 
    progress: navProgress, 
    targetProject, 
    navigateToProject 
  } = useProjectNavigation()
  const projectsRef = useRef<HTMLDivElement>(null)

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/mdarabkhan02/new-meeting'});
    } else {
      // Fallback: open in new tab
      window.open('https://calendly.com/mdarabkhan02/new-meeting', '_blank');
    }
  }

  const handleProjectClick = (projectId: string) => {
    navigateToProject(projectId)
  }


  const projects = [
    {
      id: 'stonexis',
      title: 'Stonexis',
      category: 'web-design',
      image: '/images/stonexis/Laptop.jpg',
      hoverImage: '/images/stonexis/Cards.jpg',
      tags: ['Web design', 'Development']
    },
    {
      id: 'aurelia',
      title: 'Aurelia Hotel',
      category: 'brand-identity',
      image: '/images/aurelia/Laptop.jpg',
      hoverImage: '/images/aurelia/Phone Frames.png',
      tags: ['Branding', 'Web design']
    },
    {
      id: 'nexora',
      title: 'Nexora',
      category: 'brand-identity',
      image: '/images/nexora/Laptop Mockup.jpg',
      hoverImage: '/images/nexora/Journals Page.png',
      tags: ['Branding', 'Strategy']
    },
    {
      id: 'lza',
      title: 'LZA Architecture',
      category: 'development',
      image: '/images/lza/Laptop Mockup.jpg',
      hoverImage: '/images/lza/Card Mockup.jpg',
      tags: ['Development', 'UI/UX']
    },
    {
      id: 'kickflips',
      title: 'KickFlips',
      category: 'e-commerce',
      image: '/images/kickflips/Laptop Mockup.jpg',
      hoverImage: '/images/kickflips/Card Mockup.jpg',
      tags: ['E-commerce', 'Branding']
    }
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web-design', label: 'Web design' },
    { id: 'brand-identity', label: 'Brand identity' },
    { id: 'development', label: 'Development' },
    { id: 'e-commerce', label: 'E-commerce' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (workTitleRef.current) {
      gsap.fromTo(
        workTitleRef.current,
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
            trigger: workTitleRef.current,
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
    <>
      {/* Project Navigation Loading Screen */}
      <ProjectLoadingScreen 
        isVisible={isNavigating}
        progress={navProgress}
        projectName={targetProject ? targetProject.charAt(0).toUpperCase() + targetProject.slice(1) : undefined}
      />
      
      <style jsx global>{`
        body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
        html {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
      `}</style>
      <div className="min-h-screen bg-white overflow-x-hidden max-w-full">
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="lazyOnload"
          onLoad={() => setCalendlyLoaded(true)}
        />
        <Header />

      <main className="pt-24 max-w-full overflow-x-hidden">
        {/* Work Title Section */}
        <section className="px-6 md:px-12 py-8 md:py-32 max-w-full overflow-x-hidden">
          <div className="text-center">
            <h1 ref={workTitleRef} className="text-6xl md:text-7xl font-light text-black mb-8 md:mb-16 tracking-[-0.075em]">
              Work
            </h1>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="px-6 md:px-12 pb-16 max-w-full overflow-x-hidden">
          <div className="flex justify-center">
            <div className="flex gap-4 flex-wrap max-w-full">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={projectsRef} className="px-6 md:px-12 pb-32 max-w-full overflow-x-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="relative bg-gray-200 rounded-lg overflow-hidden h-[600px] md:h-[700px] cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} project showcase`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-6 left-6">
                  <h3 className="font-light text-white text-4xl md:text-2xl">
                    {project.title}
                  </h3>
                </div>
                <div className="absolute bottom-6 left-6 flex gap-3">
                  {project.tags.map((tag, index) => (
                    <button 
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm md:text-xs font-medium transition-colors ${
                        index === 0 
                          ? 'bg-black/80 text-white hover:bg-black/90' 
                          : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="preview-overlay absolute top-8 left-8 right-8 bottom-8 opacity-0 scale-75 pointer-events-none flex items-center justify-center">
                  <div className="relative w-full max-w-4xl aspect-[2000/1192]">
                    <Image
                      src={project.hoverImage}
                      alt={`${project.title} Preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            ))}
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
                    step with us
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
      </main>
      </div>
    </>
  )
}
