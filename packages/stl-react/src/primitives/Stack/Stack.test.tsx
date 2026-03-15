import { render, screen } from '../../../../../src/__test-utils__/render'
import { HStack, Stack, VStack } from './Stack'

describe('Stack', () => {
  describe('VStack', () => {
    it('renders children', () => {
      render(
        <VStack data-testid="vstack">
          <div>Child</div>
        </VStack>,
      )
      expect(screen.getByTestId('vstack')).toBeTruthy()
      expect(screen.getByText('Child')).toBeTruthy()
    })
  })

  describe('HStack', () => {
    it('renders children', () => {
      render(
        <HStack data-testid="hstack">
          <div>Child</div>
        </HStack>,
      )
      expect(screen.getByTestId('hstack')).toBeTruthy()
      expect(screen.getByText('Child')).toBeTruthy()
    })
  })

  describe('Stack (alias)', () => {
    it('renders children', () => {
      render(
        <Stack data-testid="stack">
          <div>Child</div>
        </Stack>,
      )
      expect(screen.getByTestId('stack')).toBeTruthy()
      expect(screen.getByText('Child')).toBeTruthy()
    })
  })
})
