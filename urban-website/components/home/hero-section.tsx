"use client"
import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useGetMetadataQuery } from "../api/metadata/metadata.api"

const HeroSection = () => {
  const { data, isError, error } = useGetMetadataQuery()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentSlideRef = useRef(currentSlide)

  const slides = data?.bannerImage || []
  const slidesCount = slides.length

  // Update ref when currentSlide changes
  useEffect(() => {
    currentSlideRef.current = currentSlide
  }, [currentSlide])

  // Auto-advance carousel (fixed version)
  useEffect(() => {
    if (slidesCount === 0 || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesCount)
    }, 3000) // Changed to 3 seconds for better UX

    return () => clearInterval(interval)
  }, [slidesCount, isAutoPlaying])

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slidesCount)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [slidesCount, isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [slidesCount, isTransitioning])

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 300)
    },
    [currentSlide, isTransitioning],
  )

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide()
      } else if (event.key === "ArrowRight") {
        nextSlide()
      } else if (event.key === " ") {
        event.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Show error in console if any
  useEffect(() => {
    if (isError) {
      console.log(error)
    }
  }, [isError, error])

  // Loading state
  if (!data || slidesCount === 0) {
    return (
      <div className="min-h-[70vh] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden group">
      {/* Main carousel container */}
      <div className="relative h-full">
        {slides.map((imageUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              className='object-cover'
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl xl:text-7xl font-black text-white mb-4 leading-tight">{data?.title}</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">{data?.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={data?.bannerUrl || "#"}>
              <Button
                size="lg"
                className="rounded-full px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100 transition-all duration-300"
              >
                Explore Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-3 text-lg font-semibold border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {slidesCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide indicators */}
      {slidesCount > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index ? "bg-white w-8 h-3" : "bg-white/50 hover:bg-white/75 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play control */}
      {slidesCount > 1 && (
        <button
          onClick={toggleAutoPlay}
          className="absolute top-6 right-6 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      )}

      {/* Slide counter */}
      {slidesCount > 1 && (
        <div className="absolute top-6 left-6 bg-black/30 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
          {currentSlide + 1} / {slidesCount}
        </div>
      )}
    </div>
  )
}

export default HeroSection