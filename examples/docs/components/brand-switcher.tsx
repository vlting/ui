'use client'

import { useBrand } from './providers'

const brandLabels: Record<string, string> = {
  default: 'Default',
  shadcn: 'Shadcn',
  fun: 'Fun',
  posh: 'Posh',
}

export function BrandSwitcher() {
  const { brand, setBrand, brandOptions } = useBrand()

  return (
    <select
      value={brand}
      onChange={(e) => setBrand(e.target.value as typeof brand)}
      className="rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm dark:border-gray-600"
      aria-label="Select brand theme"
    >
      {brandOptions.map((key) => (
        <option key={key} value={key}>
          {brandLabels[key]}
        </option>
      ))}
    </select>
  )
}
