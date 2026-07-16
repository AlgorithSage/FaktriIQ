import { useEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 1,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let cancelled = false

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      // Wait for all fonts to finish loading before creating the annotation.
      // This prevents the SVG overlay from being positioned against fallback
      // font metrics, which causes drift after custom fonts load and reflow text.
      document.fonts.ready.then(() => {
        if (cancelled) return

        const currentAnnotation = annotate(element, annotationConfig)
        annotation = currentAnnotation
        currentAnnotation.show()

        let lastWidth = element.offsetWidth
        let lastHeight = element.offsetHeight

        resizeObserver = new ResizeObserver(() => {
          const currentWidth = element.offsetWidth
          const currentHeight = element.offsetHeight
          if (currentWidth !== lastWidth || currentHeight !== lastHeight) {
            lastWidth = currentWidth
            lastHeight = currentHeight
            currentAnnotation.hide()
            currentAnnotation.show()
          }
        })

        resizeObserver.observe(element)
      })
    }

    return () => {
      cancelled = true
      annotation?.remove()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      <span className="relative z-[1]">{children}</span>
    </span>
  )
}

