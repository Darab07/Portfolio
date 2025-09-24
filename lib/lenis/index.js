// Simple Lenis implementation for smooth scrolling
class Lenis {
  constructor(options = {}) {
    this.options = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
      ...options
    }
    
    this.scroll = 0
    this.targetScroll = 0
    this.velocity = 0
    this.isScrolling = false
    this.isStopped = false
    this.isSmooth = this.options.smooth
    
    this.init()
  }
  
  init() {
    if (typeof window === 'undefined') return
    
    this.scroll = window.pageYOffset
    this.targetScroll = this.scroll
    
    this.bindEvents()
    this.raf()
  }
  
  bindEvents() {
    if (typeof window === 'undefined') return
    
    this.onWheel = this.onWheel.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    
    window.addEventListener('wheel', this.onWheel, { passive: false })
    window.addEventListener('touchstart', this.onTouchStart, { passive: false })
    window.addEventListener('touchmove', this.onTouchMove, { passive: false })
    window.addEventListener('touchend', this.onTouchEnd, { passive: false })
  }
  
  onWheel(e) {
    if (!this.isSmooth) return
    
    e.preventDefault()
    
    const delta = e.deltaY * this.options.wheelMultiplier
    this.targetScroll += delta
    this.targetScroll = Math.max(0, Math.min(this.targetScroll, this.getMaxScroll()))
  }
  
  onTouchStart(e) {
    if (!this.isSmooth) return
    
    this.isScrolling = true
    this.startY = e.touches[0].clientY
  }
  
  onTouchMove(e) {
    if (!this.isScrolling || !this.isSmooth) return
    
    e.preventDefault()
    
    const delta = (this.startY - e.touches[0].clientY) * this.options.touchMultiplier
    this.targetScroll += delta
    this.targetScroll = Math.max(0, Math.min(this.targetScroll, this.getMaxScroll()))
    this.startY = e.touches[0].clientY
  }
  
  onTouchEnd() {
    this.isScrolling = false
  }
  
  getMaxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight
  }
  
  raf() {
    if (typeof window === 'undefined') return
    
    const delta = this.targetScroll - this.scroll
    this.velocity += delta * 0.1
    this.velocity *= 0.8
    
    if (Math.abs(this.velocity) > 0.1) {
      this.scroll += this.velocity
      window.scrollTo(0, this.scroll)
      
      // Trigger scroll callback
      if (this.scrollCallback) {
        this.scrollCallback()
      }
    } else {
      this.scroll = this.targetScroll
      window.scrollTo(0, this.scroll)
    }
    
    requestAnimationFrame(this.raf.bind(this))
  }
  
  on(event, callback) {
    if (event === 'scroll') {
      this.scrollCallback = callback
    }
  }
  
  destroy() {
    if (typeof window === 'undefined') return
    
    window.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
  }
}

export default Lenis
