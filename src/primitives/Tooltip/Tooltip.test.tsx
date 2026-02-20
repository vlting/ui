import { render, screen } from '../../__test-utils__/render'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <Tooltip>
          <Tooltip.Trigger testID="trigger">
            Hover me
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Helpful information
          </Tooltip.Content>
        </Tooltip>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })

    it('renders the trigger element', () => {
      render(
        <Tooltip>
          <Tooltip.Trigger>
            Open tooltip
          </Tooltip.Trigger>
          <Tooltip.Content>
            Some info
          </Tooltip.Content>
        </Tooltip>,
      )
      expect(screen.getByText('Open tooltip')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Tooltip.Trigger', () => {
      render(
        <Tooltip>
          <Tooltip.Trigger testID="trigger">Label</Tooltip.Trigger>
          <Tooltip.Content>Info</Tooltip.Content>
        </Tooltip>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })

    it('exposes Tooltip.Content', () => {
      render(
        <Tooltip open>
          <Tooltip.Trigger>Label</Tooltip.Trigger>
          <Tooltip.Content testID="content">
            <Tooltip.Arrow />
            Info text
          </Tooltip.Content>
        </Tooltip>,
      )
      expect(screen.getByTestId('content')).toBeTruthy()
    })
  })

  describe('controlled state', () => {
    it('renders content when open', () => {
      render(
        <Tooltip open>
          <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Tooltip text
          </Tooltip.Content>
        </Tooltip>,
      )
      expect(screen.getByText('Tooltip text')).toBeTruthy()
    })
  })
})
