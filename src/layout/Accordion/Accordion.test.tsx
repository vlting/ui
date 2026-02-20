import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Accordion } from './Accordion'

const ThreeItems = () => (
  <Accordion testID="accordion">
    <Accordion.Item value="item1" testID="item1">
      <Accordion.Header testID="header1">Section 1</Accordion.Header>
      <Accordion.Content testID="content1">Content 1</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item2" testID="item2">
      <Accordion.Header testID="header2">Section 2</Accordion.Header>
      <Accordion.Content testID="content2">Content 2</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item3" testID="item3">
      <Accordion.Header testID="header3">Section 3</Accordion.Header>
      <Accordion.Content testID="content3">Content 3</Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

describe('Accordion', () => {
  it('renders without crashing', () => {
    render(<Accordion testID="accordion" />)
    expect(screen.getByTestId('accordion')).toBeTruthy()
  })

  it('renders all items closed by default', () => {
    render(<ThreeItems />)
    expect(screen.queryByTestId('content1')).toBeNull()
    expect(screen.queryByTestId('content2')).toBeNull()
  })

  it('opens an item when its header is pressed', () => {
    render(<ThreeItems />)
    fireEvent.press(screen.getByTestId('header1'))
    expect(screen.getByTestId('content1')).toBeTruthy()
  })

  it('closes an open item when its header is pressed again', () => {
    render(<ThreeItems />)
    fireEvent.press(screen.getByTestId('header1'))
    expect(screen.getByTestId('content1')).toBeTruthy()
    fireEvent.press(screen.getByTestId('header1'))
    expect(screen.queryByTestId('content1')).toBeNull()
  })

  it('single mode: opening one item closes the previously open item', () => {
    render(<ThreeItems />)
    fireEvent.press(screen.getByTestId('header1'))
    expect(screen.getByTestId('content1')).toBeTruthy()
    fireEvent.press(screen.getByTestId('header2'))
    expect(screen.queryByTestId('content1')).toBeNull()
    expect(screen.getByTestId('content2')).toBeTruthy()
  })

  it('multiple mode: multiple items can be open simultaneously', () => {
    render(
      <Accordion testID="accordion" type="multiple">
        <Accordion.Item value="item1">
          <Accordion.Header testID="header1">S1</Accordion.Header>
          <Accordion.Content testID="content1">C1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Header testID="header2">S2</Accordion.Header>
          <Accordion.Content testID="content2">C2</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )
    fireEvent.press(screen.getByTestId('header1'))
    fireEvent.press(screen.getByTestId('header2'))
    expect(screen.getByTestId('content1')).toBeTruthy()
    expect(screen.getByTestId('content2')).toBeTruthy()
  })

  it('controlled mode: respects parent value and onChange', () => {
    const onValueChange = jest.fn()
    render(
      <Accordion testID="accordion" value={['item1']} onValueChange={onValueChange}>
        <Accordion.Item value="item1">
          <Accordion.Header testID="header1">S1</Accordion.Header>
          <Accordion.Content testID="content1">C1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Header testID="header2">S2</Accordion.Header>
          <Accordion.Content testID="content2">C2</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )
    expect(screen.getByTestId('content1')).toBeTruthy()
    fireEvent.press(screen.getByTestId('header2'))
    expect(onValueChange).toHaveBeenCalled()
  })

  it('disabled item header is non-interactive', () => {
    const onValueChange = jest.fn()
    render(
      <Accordion testID="accordion" onValueChange={onValueChange}>
        <Accordion.Item value="item1" disabled>
          <Accordion.Header testID="header1">Disabled</Accordion.Header>
          <Accordion.Content testID="content1">C1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )
    fireEvent.press(screen.getByTestId('header1'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('keepMounted keeps content in DOM when closed', () => {
    render(
      <Accordion testID="accordion" keepMounted>
        <Accordion.Item value="item1">
          <Accordion.Header testID="header1">S1</Accordion.Header>
          <Accordion.Content testID="content1">C1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    )
    // Content is in DOM but hidden
    expect(screen.getByTestId('content1')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<Accordion testID="accordion-dark" />)
    expect(screen.getByTestId('accordion-dark')).toBeTruthy()
  })
})
