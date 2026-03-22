import { render, screen } from '../../../src/__test-utils__/render'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders a nav element with aria-label', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    const nav = container.querySelector('nav')
    expect(nav).toBeTruthy()
    expect(nav!.getAttribute('aria-label')).toBe('Breadcrumb')
  })

  it('renders an ordered list', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    expect(container.querySelector('ol')).toBeTruthy()
    expect(container.querySelector('li')).toBeTruthy()
  })

  it('renders links as anchor elements', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/about">About</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    const link = container.querySelector('a')
    expect(link).toBeTruthy()
    expect(link!.getAttribute('href')).toBe('/about')
  })

  it('renders page item with aria-current="page"', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    const page = container.querySelector('[aria-current="page"]')
    expect(page).toBeTruthy()
    expect(page!.textContent).toBe('Current')
  })

  it('renders default "/" separator', () => {
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>About</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    expect(screen.getByText('/')).toBeTruthy()
  })

  it('separator has aria-hidden', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>About</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    const sep = container.querySelector('[aria-hidden="true"]')
    expect(sep).toBeTruthy()
  })

  it('supports custom separator content', () => {
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Page>About</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    expect(screen.getByText('>')).toBeTruthy()
  })

  it('renders ellipsis', () => {
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    expect(screen.getByText('\u2026')).toBeTruthy()
  })

  it('renders full breadcrumb trail', () => {
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Getting Started</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Docs')).toBeTruthy()
    expect(screen.getByText('Getting Started')).toBeTruthy()
  })

  it('multiple links have correct hrefs', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    )
    const links = container.querySelectorAll('a')
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/docs')
  })
})
