import { fireEvent, render, screen } from '../../__test-utils__/render'
import { PhotoGalleryUploader } from './PhotoGalleryUploader'
import type { PhotoSlot } from './PhotoGalleryUploader'

describe('PhotoGalleryUploader', () => {
  const emptyPhotos: PhotoSlot[] = []

  const filledPhotos: PhotoSlot[] = [
    { id: '1', uri: 'https://example.com/photo1.jpg' },
    { id: '2', uri: 'https://example.com/photo2.jpg' },
  ]

  const uploadingPhotos: PhotoSlot[] = [
    { id: '1', uri: 'https://example.com/photo1.jpg' },
    { id: '2', isUploading: true, progress: 45 },
  ]

  const errorPhotos: PhotoSlot[] = [
    { id: '1', uri: 'https://example.com/photo1.jpg' },
    { id: '2', error: 'Upload failed' },
  ]

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <PhotoGalleryUploader
          photos={emptyPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      expect(screen.getByTestId('gallery')).toBeTruthy()
    })

    it('renders the correct number of slots (default maxSlots=6)', () => {
      render(
        <PhotoGalleryUploader
          photos={filledPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      // 2 filled + 4 empty = 6 slots total
      // Each empty slot shows "Add Photo"
      const addTexts = screen.getAllByText('Add Photo')
      expect(addTexts.length).toBe(4)
    })

    it('renders with custom maxSlots', () => {
      render(
        <PhotoGalleryUploader
          photos={emptyPhotos}
          maxSlots={3}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      const addTexts = screen.getAllByText('Add Photo')
      expect(addTexts.length).toBe(3)
    })

    it('renders filled slots with images', () => {
      render(
        <PhotoGalleryUploader
          photos={filledPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThanOrEqual(2)
    })

    it('renders uploading slot with progress bar', () => {
      render(
        <PhotoGalleryUploader
          photos={uploadingPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toBeTruthy()
      expect(progressBar.getAttribute?.('aria-valuenow')).toBe('45')
    })

    it('renders error slot with error text', () => {
      render(
        <PhotoGalleryUploader
          photos={errorPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      expect(screen.getByText('Upload failed')).toBeTruthy()
      expect(screen.getByText('Tap to retry')).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    it('calls onAdd with slot index when empty slot is pressed', () => {
      const onAdd = jest.fn()
      render(
        <PhotoGalleryUploader
          photos={emptyPhotos}
          maxSlots={3}
          onAdd={onAdd}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      fireEvent.click(screen.getByTestId('gallery-slot-0'))
      expect(onAdd).toHaveBeenCalledWith(0)
    })

    it('calls onRemove with slot index when remove button is pressed', () => {
      const onRemove = jest.fn()
      render(
        <PhotoGalleryUploader
          photos={filledPhotos}
          onAdd={() => {}}
          onRemove={onRemove}
          testID="gallery"
        />,
      )
      fireEvent.click(screen.getByTestId('gallery-remove-0'))
      expect(onRemove).toHaveBeenCalledWith(0)
    })

    it('calls onAdd when error slot is pressed (retry)', () => {
      const onAdd = jest.fn()
      render(
        <PhotoGalleryUploader
          photos={errorPhotos}
          onAdd={onAdd}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      fireEvent.click(screen.getByTestId('gallery-slot-1'))
      expect(onAdd).toHaveBeenCalledWith(1)
    })
  })

  describe('accessibility', () => {
    it('has role="group" on the container', () => {
      render(
        <PhotoGalleryUploader
          photos={emptyPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      const el = screen.getByTestId('gallery')
      expect(el.getAttribute?.('role')).toBe('group')
    })

    it('empty slot has correct aria-label', () => {
      render(
        <PhotoGalleryUploader
          photos={emptyPhotos}
          maxSlots={1}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      expect(screen.getByLabelText('Photo slot 1, empty')).toBeTruthy()
    })

    it('uploading slot has correct aria-label', () => {
      render(
        <PhotoGalleryUploader
          photos={uploadingPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      expect(screen.getByLabelText('Photo slot 2, uploading')).toBeTruthy()
    })

    it('remove button has descriptive aria-label', () => {
      render(
        <PhotoGalleryUploader
          photos={filledPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      expect(screen.getByLabelText('Remove photo 1')).toBeTruthy()
    })

    it('progress bar has correct aria-valuemin and aria-valuemax', () => {
      render(
        <PhotoGalleryUploader
          photos={uploadingPhotos}
          onAdd={() => {}}
          onRemove={() => {}}
          testID="gallery"
        />,
      )
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar.getAttribute?.('aria-valuemin')).toBe('0')
      expect(progressBar.getAttribute?.('aria-valuemax')).toBe('100')
    })
  })
})
