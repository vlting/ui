import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar11 } from './Sidebar11'
import type { FileTreeItem } from './_shared'

const sampleTree: FileTreeItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'index.ts', type: 'file', onPress: jest.fn() },
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Button.tsx', type: 'file', onPress: jest.fn() },
          { name: 'Card.tsx', type: 'file', onPress: jest.fn() },
        ],
      },
    ],
  },
  { name: 'README.md', type: 'file', onPress: jest.fn() },
]

describe('Sidebar11', () => {
  it('renders top-level items', () => {
    render(<Sidebar11 tree={sampleTree} />)
    expect(screen.getByText('src')).toBeDefined()
    expect(screen.getByText('README.md')).toBeDefined()
  })

  it('renders nested files when folder is expanded', () => {
    render(<Sidebar11 tree={sampleTree} />)
    // Folders default to collapsed unless active
    // Click to expand 'src' folder
    const srcFolder = screen.getByText('src')
    fireEvent.click(srcFolder)
    expect(screen.getByText('index.ts')).toBeDefined()
    expect(screen.getByText('components')).toBeDefined()
  })

  it('renders deeply nested items', () => {
    const tree: FileTreeItem[] = [
      {
        name: 'root',
        type: 'folder',
        active: true,
        children: [
          {
            name: 'sub',
            type: 'folder',
            active: true,
            children: [{ name: 'deep.txt', type: 'file' }],
          },
        ],
      },
    ]
    render(<Sidebar11 tree={tree} />)
    expect(screen.getByText('deep.txt')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar11 tree={sampleTree} header={<span>Files</span>} />)
    expect(screen.getByText('Files')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar11 tree={sampleTree} footer={<span>Status</span>} />)
    expect(screen.getByText('Status')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar11 tree={sampleTree} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders file items as menuitems', () => {
    render(<Sidebar11 tree={[{ name: 'test.txt', type: 'file' }]} />)
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems.length).toBeGreaterThanOrEqual(1)
  })

  it('renders custom icons when provided', () => {
    const tree: FileTreeItem[] = [
      {
        name: 'custom.txt',
        type: 'file',
        icon: <span data-testid="custom-icon">⚡</span>,
      },
    ]
    render(<Sidebar11 tree={tree} />)
    expect(screen.getByTestId('custom-icon')).toBeDefined()
  })
})
