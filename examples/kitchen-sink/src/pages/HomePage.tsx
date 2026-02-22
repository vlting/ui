import React from 'react'
import { YStack, Text, Heading, XStack } from 'tamagui'
import { useNavigate, useParams } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()
  const { brand = 'default' } = useParams()

  const sections = [
    { path: 'primitives', title: 'Primitives', description: 'Box, Stack, Text, Heading, Label, Badge, Skeleton, Separator, Divider, Spacer, AspectRatio' },
    { path: 'components', title: 'Components', description: 'Button, Input, Textarea, Card, Dialog, Tabs, Select, Checkbox, Radio, Switch, Slider, Progress, Avatar, Alert, Toggle, Tooltip, and more' },
    { path: 'composed', title: 'Composed', description: 'Accordion, AlertDialog, Collapsible, Table, Breadcrumb, Form' },
    { path: 'headless', title: 'Headless', description: 'Dialog, Tabs, Checkbox — unstyled behavioral primitives' },
    { path: 'hooks', title: 'Hooks', description: 'useControllableState, useFocusTrap, useKeyboardNavigation' },
  ]

  return (
    <YStack padding="$6" gap="$5" maxWidth={900} marginHorizontal="auto" width="100%">
      <YStack gap="$2">
        <Heading fontFamily="$heading" fontSize="$9" fontWeight="$5">
          Kitchen Sink
        </Heading>
        <Text fontFamily="$body" fontSize="$5" color="$colorSubtitle">
          Every component in @vlting/ui, organized by layer.
        </Text>
      </YStack>

      <XStack flexWrap="wrap" gap="$4">
        {sections.map((s) => (
          <YStack
            key={s.path}
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            padding="$4"
            gap="$2"
            flex={1}
            minWidth={260}
            cursor="pointer"
            hoverStyle={{ backgroundColor: '$backgroundHover' }}
            pressStyle={{ backgroundColor: '$backgroundPress', scale: 0.99 }}
            animation="fast"
            onPress={() => navigate(`/${brand}/${s.path}`)}
          >
            <Text fontFamily="$heading" fontWeight="$4" fontSize="$5">
              {s.title}
            </Text>
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              {s.description}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}
