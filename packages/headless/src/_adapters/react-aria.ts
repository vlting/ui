/**
 * Centralized react-aria adapter.
 * All react-aria imports go through here — no hook imports react-aria directly.
 * This decouples our headless API from react-aria internals.
 */

// @react-aria/focus
export { FocusScope } from '@react-aria/focus'
export type { FocusScopeProps } from '@react-aria/focus'

// @react-aria/live-announcer
export { announce, clearAnnouncer, destroyAnnouncer } from '@react-aria/live-announcer'
