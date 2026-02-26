// config/flags.ts — Feature flag registry (managed by epic skill)
// Do not edit flag entries manually — use /epic to create and manage flags.

type Environment = 'dev' | 'staging' | 'prod';

interface FlagDefinition {
  description: string;
  added: string; // YYYY-MM-DD
  default: boolean;
  overrides?: Partial<Record<Environment, boolean>>;
}

const flagRegistry = {
  quality_audit: {
    description: 'Quality audit fixes: TS errors, lint, a11y, token discipline, reduced motion',
    added: '2026-02-26',
    default: false,
    overrides: { dev: true, staging: true },
  },
} as const satisfies Record<string, FlagDefinition>;

// -- Derived types ----------------------------------------------------------

export type FlagName = keyof typeof flagRegistry;

// -- Runtime helper ----------------------------------------------------------

const ENV: Environment =
  (process.env.APP_ENV as Environment) ??
  (process.env.NODE_ENV === 'production' ? 'prod' : 'dev');

export function getFlag(name: FlagName, env: Environment = ENV): boolean {
  const flag = flagRegistry[name];
  return flag.overrides?.[env] ?? flag.default;
}

// -- Full registry export (for tooling / status commands) --------------------

export { flagRegistry };
