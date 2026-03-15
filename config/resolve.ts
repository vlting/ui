import path from 'node:path'

// ---------------------------------------------------------------------------
// Centralized package → path mappings for the monorepo.
// Each app (Vite, Next, Expo) imports this helper instead of duplicating paths.
// ---------------------------------------------------------------------------

/** Map of package specifiers to their source directories relative to repo root. */
export const vltPackagePaths: Record<string, string> = {
  '@vlting/ui/primitives': 'packages/stl-react/src/primitives',
  '@vlting/ui/components': 'packages/components',
  '@vlting/ui/headless': 'packages/headless/src',
  '@vlting/ui/hooks': 'packages/utils',
  '@vlting/ui/icons': 'packages/icons',
  '@vlting/ui/utils': 'packages/utils',
  '@vlting/ui': 'src',
  '@vlting/stl-react': 'packages/stl-react/src',
  '@vlting/headless': 'packages/headless/src',
  '@vlting/stl/styles': 'packages/stl/src/config/styles.css.ts',
  '@vlting/stl/theme': 'packages/stl/src/theme',
  '@vlting/stl': 'packages/stl/src',
}

/** Platform aliases that every web build needs. */
const platformAliases: Record<string, string> = {
  'react-native-svg': 'react-native-svg-web',
  'react-native': 'react-native-web',
}

/**
 * Returns Vite-compatible alias array.
 * @param root — absolute path to the app directory (typically `__dirname`)
 * @param repoRoot — absolute path to the repo root (defaults to `root/../../`)
 */
export function viteAliases(root: string, repoRoot?: string) {
  const repo = repoRoot ?? path.resolve(root, '../..')
  const aliases: Array<{ find: string | RegExp; replacement: string }> = []

  // Platform aliases
  for (const [find, replacement] of Object.entries(platformAliases)) {
    aliases.push({
      find: find === 'react-native' ? /^react-native$/ : find,
      replacement,
    })
  }

  // Package aliases
  for (const [pkg, rel] of Object.entries(vltPackagePaths)) {
    aliases.push({
      find: pkg,
      replacement: path.resolve(repo, rel),
    })
  }

  return aliases
}

/**
 * Returns Next.js webpack alias map.
 * @param repoRoot — absolute path to the repo root
 */
export function nextAliases(repoRoot: string): Record<string, string> {
  const aliases: Record<string, string> = {}

  for (const [find, replacement] of Object.entries(platformAliases)) {
    aliases[find] = replacement
  }

  for (const [pkg, rel] of Object.entries(vltPackagePaths)) {
    aliases[pkg] = path.resolve(repoRoot, rel)
  }

  return aliases
}
