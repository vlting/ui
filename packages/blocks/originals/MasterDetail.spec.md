# MasterDetail — Split View Responsive Pattern

## Description
Responsive split-view layout with a master list on the left and detail panel on the right. On narrow screens, shows either master or detail based on selection state.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| masterContent | ReactNode | required | Master list/panel content |
| detailContent | ReactNode | - | Detail panel content |
| masterWidth | number \| string | 320 | Master panel width |
| showDetail | boolean | false | Whether to show detail panel on mobile |
| onBack | () => void | - | Back button callback (mobile detail view) |
| masterHeader | ReactNode | - | Master panel header |
| detailHeader | ReactNode | - | Detail panel header |

## Layout
- **Desktop**: Side-by-side row. Master (fixed width) + Detail (flex=1) with border separator.
- **Mobile (md and below)**: Master or detail shown based on `showDetail` prop.
  - `showDetail=false`: Master content full width, detail hidden.
  - `showDetail=true`: Detail full width with back button, master hidden.

## Accessibility
- Back button for mobile navigation
- Semantic layout with clear visual separation
- Keyboard navigable
