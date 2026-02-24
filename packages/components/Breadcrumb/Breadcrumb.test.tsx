import React from 'react'
import { render } from '../../../src/__test-utils__/render'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders a nav element with aria-label', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    )
    const nav = container.querySelector('nav')
    expect(nav).toBeTruthy()
    expect(nav!.getAttribute('aria-label')).toBe('Breadcrumb')
  })

  it('renders an ordered list', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    )
    expect(container.querySelector('ol')).toBeTruthy()
    expect(container.querySelector('li')).toBeTruthy()
  })

  it('renders links as anchor elements', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/about">About</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    )
    const link = container.querySelector('a')
    expect(link).toBeTruthy()
    expect(link!.getAttribute('href')).toBe('/about')
  })

  it('renders page (current) item with aria-current', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Current</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    )
    const page = container.querySelector('[aria-current="page"]')
    expect(page).toBeTruthy()
    expect(page!.textContent).toBe('Current')
  })

  it('renders separators between items', () => {
    const { container } = render(
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>About</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    )
    const separators = container.querySelectorAll('[role="presentation"]')
    expect(separators.length).toBeGreaterThan(0)
  })
})
