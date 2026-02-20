import { render, screen } from '../../__test-utils__/render'
import { Select } from './Select'

describe('Select', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <Select>
          <Select.Trigger testID="trigger">
            <Select.Value placeholder="Choose an option" />
          </Select.Trigger>
        </Select>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })

    it('renders placeholder text', () => {
      render(
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Select a country" />
          </Select.Trigger>
        </Select>,
      )
      expect(screen.getByText('Select a country')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Select.Trigger', () => {
      render(
        <Select>
          <Select.Trigger testID="trigger">
            <Select.Value placeholder="Pick one" />
          </Select.Trigger>
        </Select>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })

    it('exposes Select.Value', () => {
      render(
        <Select>
          <Select.Trigger>
            <Select.Value testID="value" placeholder="Pick one" />
          </Select.Trigger>
        </Select>,
      )
      expect(screen.getByTestId('value')).toBeTruthy()
    })
  })

  describe('controlled mode', () => {
    it('renders with an initial value', () => {
      render(
        <Select value="option-1">
          <Select.Trigger testID="trigger">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option-1" index={0}>
                <Select.ItemText>Option 1</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('trigger is accessible', () => {
      render(
        <Select>
          <Select.Trigger testID="trigger" aria-label="Select country">
            <Select.Value placeholder="Country" />
          </Select.Trigger>
        </Select>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })
  })
})
