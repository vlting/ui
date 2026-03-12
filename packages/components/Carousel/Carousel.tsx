import { createStub } from '../_stub'

export type CarouselRootProps = Record<string, any>
export type CarouselItemProps = Record<string, any>

export const Carousel = {
  Root: createStub('Carousel.Root', 'div'),
  Content: createStub('Carousel.Content', 'div'),
  Item: createStub('Carousel.Item', 'div'),
  Previous: createStub('Carousel.Previous', 'button'),
  Next: createStub('Carousel.Next', 'button'),
  Dots: createStub('Carousel.Dots', 'div'),
}
