import { render, screen } from '../../__test-utils__/render'
import { WebhookConfigForm } from './WebhookConfigForm'

describe('WebhookConfigForm', () => {
  it('renders without crashing', () => {
    render(<WebhookConfigForm testID="webhookconfigform" />)
    expect(screen.getByTestId('webhookconfigform')).toBeTruthy()
  })
})
