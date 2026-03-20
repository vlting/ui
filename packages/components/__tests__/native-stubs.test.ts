import { describe, it, expect } from 'vitest'
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  DropdownMenu,
  Input,
  Label,
  Select,
  Separator,
  Sheet,
  Switch,
  Tabs,
  Toast,
  Tooltip,
  useNativeToast,
} from '../index.native'

import type {
  AccordionRootProps,
  AlertProps,
  AvatarProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  CheckboxRootProps,
  InputProps,
  LabelProps,
  SelectProps,
  SeparatorProps,
  SwitchProps,
  TooltipProps,
} from '../index.native'

// Type-level assertions — these just need to compile
type _Assert = [
  AccordionRootProps,
  AlertProps,
  AvatarProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  CheckboxRootProps,
  InputProps,
  LabelProps,
  SelectProps,
  SeparatorProps,
  SwitchProps,
  TooltipProps,
]

describe('native stubs', () => {
  it('all components are truthy', () => {
    const components = [
      Accordion, Alert, Avatar, Badge, Button, Card, Checkbox,
      Dialog, DropdownMenu, Input, Label, Select, Separator,
      Sheet, Switch, Tabs, Toast, Tooltip,
    ]
    for (const c of components) {
      expect(c).toBeTruthy()
    }
  })

  it('compound components have expected sub-component keys', () => {
    const compounds: Record<string, string[]> = {
      Accordion: ['Item', 'Trigger', 'Content'],
      Alert: ['Root', 'Title', 'Description', 'Icon'],
      Avatar: ['Image', 'Fallback'],
      Button: ['Text', 'Icon'],
      Card: ['Header', 'Content', 'Footer', 'Title', 'Description'],
      Checkbox: ['Root', 'Indicator'],
      Dialog: ['Trigger', 'Content', 'Header', 'Footer', 'Title', 'Description', 'Close'],
      DropdownMenu: ['Trigger', 'Content', 'Item', 'Separator', 'Label'],
      Select: ['Item', 'Value', 'Group', 'Label', 'Separator'],
      Sheet: ['Trigger', 'Content', 'Header', 'Footer', 'Title', 'Description', 'Close'],
      Tabs: ['Root', 'List', 'Trigger', 'Content'],
      Toast: ['Provider', 'Root', 'Title', 'Description', 'Close', 'Viewport'],
    }

    const componentMap: Record<string, any> = {
      Accordion, Alert, Avatar, Button, Card, Checkbox,
      Dialog, DropdownMenu, Select, Sheet, Tabs, Toast,
    }

    for (const [name, keys] of Object.entries(compounds)) {
      const component = componentMap[name]
      for (const key of keys) {
        expect(component[key], `${name}.${key} should exist`).toBeTruthy()
      }
    }
  })

  it('useNativeToast returns add and remove', () => {
    const toast = useNativeToast()
    expect(toast.add).toBeDefined()
    expect(toast.remove).toBeDefined()
  })
})
