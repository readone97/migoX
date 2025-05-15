"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface UseInViewOptions {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

export function useInView(elementRef: React.RefObject<Element>, options: UseInViewOptions = {}) {
  const { once = false, threshold = 0, rootMargin = "0px" } = options
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && once && elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [elementRef, once, threshold, rootMargin])

  return isInView
}

