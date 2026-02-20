/**
 * Tamagui v2 RC: JSX rendering workaround
 *
 * In v2 RC, `GetFinalProps<>` doesn't correctly infer token string values
 * (e.g. "$4", "$color") in JSX prop positions, causing TS2322 errors on
 * children and token props. This is a known RC-phase type-system limitation
 * that does NOT affect runtime behaviour.
 *
 * This file re-exports Tamagui primitives typed as `ComponentType<any>` so
 * function-component renders can accept token-based prop values without
 * compile errors. Remove when upgrading past v2 RC.
 */

import React from 'react'
import {
  AlertCircle as _AlertCircle,
  AlertTriangle as _AlertTriangle,
  Bold as _Bold,
  Check as _Check,
  CheckCircle as _CheckCircle,
  ChevronDown as _ChevronDown,
  ChevronLeft as _ChevronLeft,
  ChevronRight as _ChevronRight,
  Info as _Info,
  Italic as _Italic,
  Link as _Link,
  List as _List,
  ListOrdered as _ListOrdered,
  Plus as _Plus,
  Underline as _Underline,
  Upload as _Upload,
  X as _X,
} from '@tamagui/lucide-icons'
import {
  Image as _Image,
  Input as _Input,
  Popover as _Popover,
  ScrollView as _ScrollView,
  Spinner as _Spinner,
  Text as _Text,
  View as _View,
  XStack as _XStack,
  YStack as _YStack,
} from 'tamagui'

type AnyProps = Record<string, unknown>
type AnyFC = React.ComponentType<AnyProps>
type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

// Tamagui layout primitives (bypass v2 RC JSX token prop type bugs)
export const YStack = _YStack as AnyFC
export const XStack = _XStack as AnyFC
export const Text = _Text as AnyFC
export const View = _View as AnyFC
export const Input = _Input as AnyFC
export const ScrollView = _ScrollView as AnyFC
export const Image = _Image as AnyFC
export const Spinner = _Spinner as AnyFC
export const Popover = _Popover as AnyFC

// Lucide icons (bypass v2 RC icon prop type bugs)
export const AlertCircle = _AlertCircle as IconFC
export const AlertTriangle = _AlertTriangle as IconFC
export const Bold = _Bold as IconFC
export const Check = _Check as IconFC
export const CheckCircle = _CheckCircle as IconFC
export const ChevronDown = _ChevronDown as IconFC
export const ChevronLeft = _ChevronLeft as IconFC
export const ChevronRight = _ChevronRight as IconFC
export const Info = _Info as IconFC
export const Italic = _Italic as IconFC
export const Link = _Link as IconFC
export const List = _List as IconFC
export const ListOrdered = _ListOrdered as IconFC
export const Plus = _Plus as IconFC
export const Underline = _Underline as IconFC
export const Upload = _Upload as IconFC
export const X = _X as IconFC
