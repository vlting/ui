# Component Spec — ProductGallery

## 1. Purpose

Displays a collection of product images in an interactive gallery, allowing users to browse multiple views of a single product. It is used on product detail pages to give users a thorough visual understanding of the product before purchasing.

Use when: a product detail page needs to display multiple images of a single product with navigation between them.

Do NOT use for: a catalog grid of multiple products (use ProductCard in a grid), a user photo gallery (use PhotoGalleryUploader in dating contexts), or image carousels of heterogeneous content.

---

## 2. UX Intent

- Primary interaction goal: let users view a product from multiple angles or in different contexts to build purchase confidence.
- Expected user mental model: a main image with thumbnail strip or dot navigation — a near-universal product gallery pattern in ecommerce (Jakob's Law).
- UX laws applied:
  - Fitts's Law: previous/next navigation controls and thumbnail targets must have adequate touch targets.
  - Gestalt (figure/ground): the main (active) image is large and dominant; thumbnails are smaller and subordinate.
  - Doherty Threshold: switching between images must feel instant — the selected image must display within 400ms.

---

## 3. Visual Behavior

- Layout: a large primary image area with a strip of thumbnail images below (or to the side on wider layouts).
- The active thumbnail is visually indicated (border, opacity, or highlight using accent token).
- Previous/next navigation arrows or buttons flank the main image on wider screens; on mobile, swiping gestures navigate between images.
- An image counter (e.g., "2 / 5") may appear overlaid on the main image.
- Main image fills its container at a fixed aspect ratio; thumbnails are uniform square or fixed-ratio tiles.
- Loading: a placeholder background fills the main image slot until the image loads; avoid layout shift.
- Spacing: thumbnail gap and strip padding use space tokens.
- Typography: image counter uses a small label token with overlay treatment for legibility over images.
- Token usage: thumbnail border/highlight, navigation button backgrounds, and counter overlay colors from theme tokens.
- Responsive: on mobile, thumbnails collapse to dot indicators; main image is swipeable. On desktop, full thumbnail strip is visible.

---

## 4. Interaction Behavior

- States: idle (first image active), navigating (transition to new image), loading (image loading placeholder), zoomed (optional zoom on press/click of main image).
- The component is controlled or uncontrolled: supports both a `selectedIndex` + `onIndexChange` pattern and a self-managed default index.
- Pressing a thumbnail sets it as the active image.
- Pressing next/prev buttons advances or retreats the active index.
- Swiping left/right on the main image navigates (mobile).
- At the first image, the prev button is disabled; at the last image, the next button is disabled. (Optionally looping, controlled by a prop.)
- Keyboard behavior:
  - Left/right arrow keys navigate images when the gallery has focus.
  - Tab navigates to thumbnail buttons; each thumbnail is activatable with Enter/Space.
  - Prev/next buttons are focusable and activatable.
- Screen reader behavior: the main image has a descriptive `alt` text; the gallery has an `aria-label` (e.g., "Product images"). The active image index is communicated via an `aria-live` announcement (e.g., "Image 2 of 5").
- Motion: image transitions use a crossfade or slide. Respects `prefers-reduced-motion` — use instant swap, no transition.

---

## 5. Accessibility Requirements

- Main image has a descriptive `alt` attribute (product name + angle/context, e.g., "Blue Running Shoe, side view").
- Thumbnail buttons each have an `aria-label` (e.g., "View image 2: Blue Running Shoe, top view").
- The active thumbnail has `aria-pressed="true"` or `aria-current="true"`.
- Prev/next buttons have `aria-label` ("Previous image", "Next image") and `aria-disabled` when at boundaries.
- An `aria-live="polite"` region announces the active image index on change.
- Gallery container has `aria-label` or `aria-labelledby` for its purpose.
- Contrast: navigation button icons and counter text meet 4.5:1 over the image overlay.
- Reduced motion: no crossfade or slide — instant image swap.

---

## 6. Theming Rules

- Required tokens: thumbnail border token (default), accent/highlight token (active thumbnail), navigation button surface token, overlay background token (for counter), `borderRadius` for thumbnail and button shapes.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel thumbnail sizes outside the token scale.
- Dark mode: thumbnail borders, navigation buttons, overlays, and counter text must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a product detail page layout, a product quick-view modal.
- What it may contain: a main image display area, thumbnail navigation strip (or dot indicators), previous/next navigation buttons, and an optional image counter overlay.
- Anti-patterns:
  - Do not use ProductGallery for product catalog grids — use ProductCard.
  - Do not embed add-to-cart controls inside the gallery.
  - Do not allow the gallery to render without at least one image.

---

## 8. Performance Constraints

- Only the active image and adjacent images (prev, next) should be eagerly loaded; remaining images use lazy loading.
- Thumbnails may all load eagerly since they are small.
- Image transitions must not cause layout shift — the main image container has a fixed aspect ratio at all times.
- Memoize the gallery when used inside a detail page with other high-frequency update components.

---

## 9. Test Requirements

- Renders the first image as active by default.
- Pressing a thumbnail makes it the active image and updates the main image display.
- Pressing next advances to the next image; pressing prev goes to the previous image.
- Prev button is disabled on the first image; next button is disabled on the last image.
- Left/right arrow keys navigate images when the gallery has focus.
- `aria-live` region announces the new active index on navigation.
- Each thumbnail has a descriptive `aria-label`.
- Main image has a non-empty `alt` attribute.
- Active thumbnail has `aria-pressed="true"` or `aria-current="true"`.
- No image transition animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for first-image state and mid-gallery state.
