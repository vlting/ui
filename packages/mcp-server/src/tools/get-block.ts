import { readFileSync, readdirSync, existsSync, statSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..', '..')

interface BlockFile {
  path: string
  content: string
}

interface BlockResult {
  name: string
  directory: string
  files: BlockFile[]
}

export function handleGetBlock(args: { name: string }): BlockResult | { error: string } {
  const blockName = args.name.toLowerCase()
  const blocksRoot = resolve(root, 'packages/blocks')
  const blockDir = resolve(blocksRoot, blockName)

  if (!existsSync(blockDir) || !statSync(blockDir).isDirectory()) {
    const allDirs = readdirSync(blocksRoot).filter((d) => {
      const full = resolve(blocksRoot, d)
      return existsSync(full) && statSync(full).isDirectory() && !d.startsWith('_')
    })
    const match = allDirs.find(
      (d) => d.toLowerCase() === blockName || d.toLowerCase().replace(/-/g, '') === blockName.replace(/-/g, '')
    )
    if (!match) {
      return { error: `Block "${args.name}" not found. Available: ${allDirs.join(', ')}` }
    }
    return getBlockFiles(match, resolve(blocksRoot, match))
  }

  return getBlockFiles(blockName, blockDir)
}

function getBlockFiles(name: string, dir: string): BlockResult {
  const files: BlockFile[] = []

  function readDir(dirPath: string) {
    for (const entry of readdirSync(dirPath)) {
      const full = resolve(dirPath, entry)
      const stat = statSync(full)
      if (stat.isDirectory()) {
        readDir(full)
      } else if ((entry.endsWith('.tsx') || entry.endsWith('.ts')) && !entry.endsWith('.test.tsx')) {
        files.push({ path: full.replace(root + '/', ''), content: readFileSync(full, 'utf8') })
      }
    }
  }

  readDir(dir)
  return { name, directory: dir.replace(root + '/', ''), files }
}
