import { render, screen } from '../../__test-utils__/render'
import { CampaignCard } from './CampaignCard'

describe('CampaignCard', () => {
  it('renders without crashing', () => {
    render(<CampaignCard testID="campaigncard" />)
    expect(screen.getByTestId('campaigncard')).toBeTruthy()
  })
})
