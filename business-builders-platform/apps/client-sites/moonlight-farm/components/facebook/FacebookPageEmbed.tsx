'use client'

import { useEffect, useRef } from 'react'

interface FacebookPageEmbedProps {
  pageUrl?: string
  tabs?: ('timeline' | 'events' | 'messages')[]
  width?: number
  height?: number
  showFaces?: boolean
  smallHeader?: boolean
  hideCover?: boolean
  className?: string
}

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void
      }
    }
    fbAsyncInit?: () => void
  }
}

let sdkLoaded = false

function loadFacebookSDK() {
  if (sdkLoaded) return
  sdkLoaded = true

  window.fbAsyncInit = function () {
    window.FB?.XFBML.parse()
  }

  const script = document.createElement('script')
  script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0'
  script.async = true
  script.defer = true
  script.crossOrigin = 'anonymous'
  document.body.appendChild(script)
}

export function FacebookPageEmbed({
  pageUrl = 'https://www.facebook.com/moonlightrunfarm',
  tabs = ['timeline'],
  width = 500,
  height = 600,
  showFaces = true,
  smallHeader = false,
  hideCover = false,
  className = '',
}: FacebookPageEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadFacebookSDK()
    // Re-parse when component mounts (for client-side navigation)
    const timer = setTimeout(() => {
      if (window.FB && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <div id="fb-root" />
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs={tabs.join(',')}
        data-width={width}
        data-height={height}
        data-small-header={smallHeader}
        data-adapt-container-width="true"
        data-hide-cover={hideCover}
        data-show-facepile={showFaces}
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl} target="_blank" rel="noopener noreferrer">
            Moonlight Run Farm LLC
          </a>
        </blockquote>
      </div>
    </div>
  )
}

export function FacebookLikeButton({
  pageUrl = 'https://www.facebook.com/moonlightrunfarm',
  className = '',
}: {
  pageUrl?: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadFacebookSDK()
    const timer = setTimeout(() => {
      if (window.FB && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <div
        className="fb-like"
        data-href={pageUrl}
        data-width=""
        data-layout="button_count"
        data-action="like"
        data-size="large"
        data-share="true"
      />
    </div>
  )
}
