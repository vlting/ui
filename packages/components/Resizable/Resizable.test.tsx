import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Resizable } from './Resizable'

describe('Resizable', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>
      )
    ).not.toThrow()
  })

  it('renders panel content', () => {
    render(
      <Resizable.PanelGroup direction="horizontal">
        <Resizable.Panel>Left Panel</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel>Right Panel</Resizable.Panel>
      </Resizable.PanelGroup>
    )
    expect(screen.getByText('Left Panel')).toBeTruthy()
    expect(screen.getByText('Right Panel')).toBeTruthy()
  })

  it('renders vertical direction', () => {
    expect(() =>
      render(
        <Resizable.PanelGroup direction="vertical">
          <Resizable.Panel>Top</Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Bottom</Resizable.Panel>
        </Resizable.PanelGroup>
      )
    ).not.toThrow()
  })

  it('renders handle with visual indicator', () => {
    expect(() =>
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>A</Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel>B</Resizable.Panel>
        </Resizable.PanelGroup>
      )
    ).not.toThrow()
  })

  it('renders panels with size constraints', () => {
    expect(() =>
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel defaultSize={30} minSize={20} maxSize={50}>
            Sidebar
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Main</Resizable.Panel>
        </Resizable.PanelGroup>
      )
    ).not.toThrow()
  })

  it('renders three panels', () => {
    render(
      <Resizable.PanelGroup direction="horizontal">
        <Resizable.Panel>One</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel>Two</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel>Three</Resizable.Panel>
      </Resizable.PanelGroup>
    )
    expect(screen.getByText('One')).toBeTruthy()
    expect(screen.getByText('Two')).toBeTruthy()
    expect(screen.getByText('Three')).toBeTruthy()
  })
})
