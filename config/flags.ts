// config/flags.ts — Feature flag registry (managed by epic skill)
// Do not edit flag entries manually — use /epic to create and manage flags.

type Environment = 'dev' | 'staging' | 'prod'

interface FlagDefinition {
  description: string
  added: string // YYYY-MM-DD
  default: boolean
  overrides?: Partial<Record<Environment, boolean>>
}

const flagRegistry = {
  quality_audit: {
    description:
      'Quality audit fixes: TS errors, lint, a11y, token discipline, reduced motion',
    added: '2026-02-26',
    default: false,
    overrides: { dev: true, staging: true },
  },
} as const satisfies Record<string, FlagDefinition>

// -- Derived types ----------------------------------------------------------

export type FlagName = keyof typeof flagRegistry

// -- Runtime helper ----------------------------------------------------------

function resolveEnv(): Environment {
  const appEnv = process.env.APP_ENV
  if (appEnv === 'dev' || appEnv === 'staging' || appEnv === 'prod') {
    return appEnv
  }
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'prod'
    case 'staging':
      return 'staging'
    default:
      return 'dev'
  }
}

const ENV: Environment = resolveEnv()

export function getFlag(name: FlagName, env: Environment = ENV): boolean {
  const flag = flagRegistry[name]
  const overrides = flag.overrides as Partial<Record<Environment, boolean>> | undefined
  return overrides?.[env] ?? flag.default
}

// -- Full registry export (for tooling / status commands) --------------------

export { flagRegistry }
