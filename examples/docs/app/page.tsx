import Link from 'next/link'

const features = [
  { title: '38+ Components', description: 'Full component library with shadcn API compatibility', href: '/docs/components/button' },
  { title: '30 Blocks', description: 'Pre-composed layouts: login, signup, sidebar, dashboard, and more', href: '/docs/blocks/login-01' },
  { title: '6 Chart Types', description: 'Area, Bar, Line, Pie, Radar, and Radial charts with 69 variants', href: '/docs/charts/bar' },
  { title: '3200+ Icons', description: 'Full Remix Icon set with tree-shakeable imports', href: '/docs/icons' },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          @vlting/ui
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Cross-platform design system built on Tamagui v2. Works on web and React Native.
          Brand theming, accessibility-first, and fully tree-shakeable.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Get Started
          </Link>
          <Link
            href="/docs/components/button"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Components
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <code className="text-sm">
            <span className="text-gray-500">$</span> yarn add @vlting/ui
          </code>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-900"
          >
            <h2 className="mb-2 text-lg font-semibold group-hover:underline">
              {feature.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  )
}
