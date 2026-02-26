import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { HStack, Stack, VStack } from './Stack'

describe('Stack', () => {
  describe('VStack', () => {
    it('renders children', () => {
      render(
        <VStack testID="vstack">
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
        <HStack testID="hstack">
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
        <Stack testID="stack">
          <div>Child</div>
        </Stack>,
      )
      expect(screen.getByTestId('stack')).toBeTruthy()
      expect(screen.getByText('Child')).toBeTruthy()
    })
  })
})
