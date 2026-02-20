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
  AlertTriangle as _AlertTriangle,
  Camera as _Camera,
  Check as _Check,
  CheckCircle as _CheckCircle,
  ChevronLeft as _ChevronLeft,
  ChevronRight as _ChevronRight,
  Clock as _Clock,
  Flag as _Flag,
  GripVertical as _GripVertical,
  Heart as _Heart,
  MapPin as _MapPin,
  MessageCircle as _MessageCircle,
  Minus as _Minus,
  Plus as _Plus,
  Send as _Send,
  Shield as _Shield,
  Trash2 as _Trash2,
  User as _User,
  Users as _Users,
  X as _X,
} from '@tamagui/lucide-icons'
import {
  Dialog as _Dialog,
  Image as _Image,
  Input as _Input,
  ScrollView as _ScrollView,
  Separator as _Separator,
  Sheet as _Sheet,
  Spinner as _Spinner,
  Text as _Text,
  TextArea as _TextArea,
  View as _View,
  XStack as _XStack,
  YStack as _YStack,
} from 'tamagui'

type AnyProps = Record<string, unknown>
type AnyFC = React.ComponentType<AnyProps>
export type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

// Tamagui layout primitives (bypass v2 RC JSX token prop type bugs)
export const YStack = _YStack as AnyFC
export const XStack = _XStack as AnyFC
export const Text = _Text as AnyFC
export const View = _View as AnyFC
export const Input = _Input as AnyFC
export const TextArea = _TextArea as AnyFC
export const ScrollView = _ScrollView as AnyFC
export const Image = _Image as AnyFC
export const Spinner = _Spinner as AnyFC
export const Dialog = _Dialog as AnyFC
export const Sheet = _Sheet as AnyFC
export const Separator = _Separator as AnyFC

// Lucide icons (bypass v2 RC icon prop type bugs)
export const AlertTriangle = _AlertTriangle as IconFC
export const Camera = _Camera as IconFC
export const Check = _Check as IconFC
export const CheckCircle = _CheckCircle as IconFC
export const ChevronLeft = _ChevronLeft as IconFC
export const ChevronRight = _ChevronRight as IconFC
export const Clock = _Clock as IconFC
export const Flag = _Flag as IconFC
export const GripVertical = _GripVertical as IconFC
export const Heart = _Heart as IconFC
export const MapPin = _MapPin as IconFC
export const MessageCircle = _MessageCircle as IconFC
export const Minus = _Minus as IconFC
export const Plus = _Plus as IconFC
export const Send = _Send as IconFC
export const Shield = _Shield as IconFC
export const Trash2 = _Trash2 as IconFC
export const User = _User as IconFC
export const Users = _Users as IconFC
export const X = _X as IconFC
