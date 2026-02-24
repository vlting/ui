import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('renders trigger text', () => {
    render(
      <Accordion.Root type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
    expect(screen.getByText('Section 1')).toBeTruthy()
  })

  it('renders multiple items', () => {
    render(
      <Accordion.Root type="single">
        <Accordion.Item value="a">
          <Accordion.Trigger>A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>B</Accordion.Trigger>
          <Accordion.Content>Content B</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })

  it('supports multiple type', () => {
    render(
      <Accordion.Root type="multiple">
        <Accordion.Item value="a">
          <Accordion.Trigger>A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
    expect(screen.getByText('A')).toBeTruthy()
  })
})
