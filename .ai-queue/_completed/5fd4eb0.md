# Commit History
- `5fd4eb0` fix(a11y): add label association, keyboard nav, and semantic HTML to form inputs

---

<!-- auto-queue -->
# A11y: Form Inputs — Input, Textarea, Select

## Result
- **Input**: Added `tag: 'label'` to InputLabel, `useId()` for input-label association via `htmlFor`/`id`, `aria-describedby` linking helper/error text, `hoverStyle` on InputFrame
- **Textarea**: Added `tag: 'label'` to TextareaLabel, `useId()` for textarea-label association, `aria-describedby` for helper/error
- **Select**: Added `tag: 'button'` to SelectTrigger for keyboard focus, full keyboard navigation (Enter/Space open, ArrowUp/Down navigate, Enter select, Escape close), focused item visual highlight, `aria-haspopup="listbox"`
- Build verified clean (963 modules, 516KB gzip 160KB)
