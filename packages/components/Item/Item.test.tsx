import { render, screen } from '../../../src/__test-utils__/render'
import { Item } from './Item'

describe('Item', () => {
  it('renders with all sub-components', () => {
    render(
      <Item testID="item">
        <Item.Leading testID="leading">
          <span>icon</span>
        </Item.Leading>
        <Item.Content testID="content">
          <Item.Title>Title text</Item.Title>
          <Item.Description>Description text</Item.Description>
        </Item.Content>
        <Item.Trailing testID="trailing">
          <span>action</span>
        </Item.Trailing>
      </Item>,
    )
    expect(screen.getByTestId('item')).toBeTruthy()
    expect(screen.getByTestId('leading')).toBeTruthy()
    expect(screen.getByTestId('content')).toBeTruthy()
    expect(screen.getByTestId('trailing')).toBeTruthy()
    expect(screen.getByText('Title text')).toBeTruthy()
    expect(screen.getByText('Description text')).toBeTruthy()
  })

  it('renders without optional sub-components', () => {
    render(
      <Item testID="item">
        <Item.Content>
          <Item.Title>Just a title</Item.Title>
        </Item.Content>
      </Item>,
    )
    expect(screen.getByTestId('item')).toBeTruthy()
    expect(screen.getByText('Just a title')).toBeTruthy()
  })

  it('renders with interactive variant', () => {
    render(
      <Item interactive testID="item">
        <Item.Content>
          <Item.Title>Interactive item</Item.Title>
        </Item.Content>
      </Item>,
    )
    expect(screen.getByTestId('item')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Item size={size} testID="item">
          <Item.Content>
            <Item.Title>Size {size}</Item.Title>
          </Item.Content>
        </Item>,
      )
      expect(screen.getByTestId('item')).toBeTruthy()
      unmount()
    }
  })
})
