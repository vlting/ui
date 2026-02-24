import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card testID="card"><div>Content</div></Card>)
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders Card.Header', () => {
    render(<Card><Card.Header testID="header">Header</Card.Header></Card>)
    expect(screen.getByTestId('header')).toBeTruthy()
  })

  it('renders Card.Content', () => {
    render(<Card><Card.Content testID="content">Body</Card.Content></Card>)
    expect(screen.getByTestId('content')).toBeTruthy()
  })

  it('renders Card.Footer', () => {
    render(<Card><Card.Footer testID="footer">Footer</Card.Footer></Card>)
    expect(screen.getByTestId('footer')).toBeTruthy()
  })

  it('renders Card.Title', () => {
    render(<Card><Card.Header><Card.Title>Title</Card.Title></Card.Header></Card>)
    expect(screen.getByText('Title')).toBeTruthy()
  })

  it('renders Card.Description', () => {
    render(<Card><Card.Header><Card.Description>Desc</Card.Description></Card.Header></Card>)
    expect(screen.getByText('Desc')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Card size={size} testID="card">Card</Card>)
      expect(screen.getByTestId('card')).toBeTruthy()
      unmount()
    }
  })

  it('renders with interactive variant', () => {
    render(<Card interactive testID="card">Click</Card>)
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('renders with elevated variant', () => {
    render(<Card elevated testID="card">Shadow</Card>)
    expect(screen.getByTestId('card')).toBeTruthy()
  })
})
