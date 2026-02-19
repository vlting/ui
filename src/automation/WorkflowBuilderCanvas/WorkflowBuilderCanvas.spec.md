# Component Spec — WorkflowBuilderCanvas

## 1. Purpose

WorkflowBuilderCanvas provides the visual editing surface for composing multi-step automation workflows. It renders a node-and-edge graph where each node represents a workflow step (trigger, condition, or action) and edges represent execution flow between steps. Users can add, connect, reorder, and remove steps on this canvas.

Use it as the primary editing surface in a workflow builder or visual automation editor.

Do NOT use it for simple linear rule builders (use a vertical form with TriggerSelector/ConditionBuilder/ActionSelector directly), for static workflow diagrams (use a read-only graph visualization), or for non-workflow diagramming tasks.

---

## 2. UX Intent

- Primary interaction goal: allow users to construct and modify complex multi-step workflows through direct manipulation of a visual graph.
- Expected user mental model: a drag-and-drop node canvas — familiar from tools like n8n, Zapier's multi-step editor, Figma's design canvas, or Miro (Jakob's Law). Nodes connect via lines/edges indicating execution order.
- UX laws applied:
  - Jakob's Law: follow established node-canvas conventions (pan to navigate, scroll to zoom, drag to move nodes, click to select/configure).
  - Gestalt (Connectedness): edges between nodes clearly communicate which steps are linked.
  - Gestalt (Proximity): related nodes (e.g., a condition and its branches) are visually grouped.
  - Fitts's Law: node connection handles and add-step buttons must be large enough to target precisely; minimum 44x44pt.
  - Hick's Law: adding a new step from the canvas opens a focused selector (TriggerSelector or ActionSelector) rather than showing all options inline.
  - Doherty Threshold: node position updates during drag are rendered in real time (no perceptible lag).

---

## 3. Visual Behavior

- Layout: a scrollable, pannable infinite canvas (or large bounded canvas) with a white/neutral background grid.
- Nodes are rectangular cards with a header (step type icon + label) and a summary of configuration.
- Edges are directional lines or arrows connecting node output ports to input ports.
- Selected node: distinct border highlight and selection handles.
- Hovered node/edge: subtle highlight.
- Canvas controls: zoom in/out buttons, "fit to view" button, optionally a minimap in a corner.
- Empty state: a centered prompt with an "Add first step" button or drag-target hint.
- Node add affordance: a "+" button on each node's output port or below the last node.
- The canvas background uses a dot-grid or line-grid pattern rendered with a subtle token color.
- Spacing between nodes on the canvas is user-controlled; default spacing for auto-layout uses space tokens.

---

## 4. Interaction Behavior

- Pointer interactions:
  - Pan: click-and-drag on the canvas background.
  - Zoom: scroll wheel; pinch gesture on touch.
  - Select node: single click on a node.
  - Move node: drag the node header.
  - Connect nodes: drag from one node's output handle to another's input handle.
  - Add step: click the "+" affordance on a node's output port or an empty canvas prompt.
  - Delete node/edge: select then press Delete/Backspace, or use a context menu.
  - Edit node: double-click or click a dedicated "Configure" button on the node.
- States per node: idle, hovered, selected, connecting (being dragged as a source), error (misconfigured), disabled.
- States per edge: idle, hovered, selected, invalid (broken connection).
- Canvas-level states: empty, has-content, read-only.
- Controlled via a `nodes` and `edges` prop array; changes fire `onNodesChange` and `onEdgesChange` callbacks.
- Keyboard behavior:
  - Arrow keys move the selected node in the canvas (with snap-to-grid if enabled).
  - `Delete` / `Backspace` removes the selected node or edge (with confirmation if the node has downstream steps).
  - `Escape` deselects the current node/edge.
  - `Tab` cycles focus through nodes in logical order (top-to-bottom, left-to-right).
  - `Enter` on a focused node opens its configuration panel.
  - `+` / `-` or `Ctrl/Cmd + scroll` zoom in/out.
  - `Ctrl/Cmd + Shift + F` fits the view to all nodes.
- Screen reader behavior: the canvas is wrapped in a `role="application"` region with an accessible name. A separate accessible node list (visually hidden or in a sidebar) allows screen readers to navigate workflow steps as a list. Each node in the list announces step type, label, and connection info. Changes (add, remove, connect) are announced via a live region.
- Motion: node drag uses real-time position updates (no deferred animation). Edge routing updates in real time. Zoom uses a smooth transition; reduced motion changes zoom instantly. Node selection/deselection is instant.

---

## 5. Accessibility Requirements

- The canvas region has `role="application"` with `aria-label="Workflow builder canvas"`.
- A keyboard-accessible alternative to drag-and-drop is provided (e.g., a structured sidebar list or keyboard commands for connecting and ordering steps).
- A visually hidden list of all workflow steps is available to screen readers, with each step's type, name, and connected-to information.
- State changes (node added, removed, connected) are announced via `aria-live="polite"`.
- Destructive actions (delete node with downstream steps) have a confirmation step announced by a live region before executing.
- Zoom controls have accessible labels ("Zoom in", "Zoom out", "Fit to view").
- The minimap (if present) is decorative and hidden from screen readers (`aria-hidden="true"`).
- Reduced motion: zoom transitions and node move animations are instant when `prefers-reduced-motion: reduce` is active.
- All visible text in node cards meets WCAG AA contrast (4.5:1).

---

## 6. Theming Rules

- Required tokens: canvas background, canvas grid color, node background, node border, node selected border, node header background, node label color, node error border, edge color, edge selected color, edge invalid color, handle color, add-step button color, zoom control background, zoom control icon color, minimap background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes, no hardcoded z-index values (use zIndex tokens).
- Dark mode: canvas background, grid, node surfaces, and edge colors all resolve correctly in dark theme; selected and error states remain visually distinct.

---

## 7. Composition Rules

- May wrap: node cards that render inside the canvas as children, edge renderers, canvas controls overlay.
- May contain (as compositional slots): trigger nodes, condition nodes, action nodes, edge connectors, canvas toolbar (zoom controls, fit button), optional minimap, empty state prompt.
- Anti-patterns:
  - Do not perform workflow execution or API persistence inside this component.
  - Do not render the configuration panel for a step inside the canvas; open it in a separate sidebar or modal.
  - Do not implement custom physics or complex animation systems; keep motion minimal and purposeful.
  - Do not allow the canvas to become the only way to manage the workflow; always provide a keyboard-accessible list view.

---

## 8. Performance Constraints

- Node and edge rendering must support at least 50 nodes and 100 edges without visible frame drops.
- Each node card must be individually memoized to prevent full-canvas re-renders when a single node's data changes.
- Drag operations must not trigger React re-renders on every mouse-move event; use canvas-level position tracking (ref-based or via a canvas library's internal state) during drag, committing to React state only on drag end.
- Viewport culling: nodes outside the visible canvas area should not render their full content.
- Zoom and pan operations must not re-render node components; isolate viewport transforms to a CSS transform or canvas-level mechanism.

---

## 9. Test Requirements

- Renders provided nodes and edges in their correct relative positions.
- Selecting a node fires the selection callback; selected node shows the selection style.
- Deleting the selected node fires `onNodesChange` with the node removed.
- Deleting a node with downstream steps triggers a confirmation; confirming fires the removal; cancelling does not.
- Connecting two nodes fires `onEdgesChange` with the new edge.
- Disconnecting an edge fires `onEdgesChange` with the edge removed.
- Empty state renders the add-first-step prompt.
- Zoom in/out controls update the canvas scale.
- Fit-to-view positions all nodes within the viewport.
- Keyboard: Arrow keys move the selected node; Delete removes it; Escape deselects; Tab cycles through nodes; Enter opens configuration.
- Screen reader list of nodes contains all steps with correct labels and connection info.
- State changes are announced via the live region.
- Accessibility: no axe violations on the accessible list view; zoom controls have labels.
- Reduced motion: no animated zoom transition when `prefers-reduced-motion` is active.
