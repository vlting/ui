'use client'

import { useCallback, useState } from 'react'
import { useBrand } from './providers'

const brandLabels: Record<string, string> = {
  default: 'Default',
  shadcn: 'Shadcn',
  fun: 'Fun',
  posh: 'Posh',
}

export function BrandSwitcher() {
  const { brand, setBrand, brandOptions } = useBrand()
  const [flash, setFlash] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setBrand(e.target.value as typeof brand)
      setFlash(true)
      setTimeout(() => setFlash(false), 300)
    },
    [setBrand],
  )

  return (
    <div className="relative inline-flex items-center">
      <select
        value={brand}
        onChange={handleChange}
        className={`appearance-none rounded-md border bg-transparent pl-2 pr-7 py-1 text-sm font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          flash
            ? 'border-blue-500 dark:border-blue-400'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        } text-gray-700 dark:text-gray-200`}
        aria-label="Select brand theme"
      >
        {brandOptions.map((key) => (
          <option key={key} value={key}>
            {brandLabels[key]}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
