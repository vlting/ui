'use client'

import { useState, type ReactNode } from 'react'

interface ComponentPreviewProps {
  children: ReactNode
  code?: string
  title?: string
}

export function ComponentPreview({ children, code, title }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
      <div className="p-8 flex items-center justify-center bg-white dark:bg-gray-950 bg-[image:radial-gradient(circle,_rgb(0_0_0_/_0.05)_1px,_transparent_1px)] dark:bg-[image:radial-gradient(circle,_rgb(255_255_255_/_0.05)_1px,_transparent_1px)] bg-[size:16px_16px]">
        <div className="w-full max-w-lg">{children}</div>
      </div>
      {code && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setShowCode(!showCode)}
              className="w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${showCode ? 'rotate-90' : ''}`}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {showCode ? 'Hide code' : 'Show code'}
            </button>
          </div>
          {showCode && (
            <div className="border-t border-gray-200 dark:border-gray-800 overflow-x-auto p-4 bg-gray-50 dark:bg-gray-950">
              <pre className="text-sm font-mono whitespace-pre-wrap">{code}</pre>
            </div>
          )}
        </>
      )}
    </div>
  )
}
