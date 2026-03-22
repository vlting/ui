import { useState } from 'react'
import { AlertDialog } from '../../../../packages/components/AlertDialog/AlertDialog.native'
import { Button } from '../../../../packages/components/Button/Button.native'
import { HoverCard } from '../../../../packages/components/HoverCard/HoverCard.native'
import { Popover } from '../../../../packages/components/Popover/Popover.native'
import { Tooltip } from '../../../../packages/components/Tooltip/Tooltip.native'
import { Box, Heading, Row, ScrollView, Spacer, Text } from '../../../../packages/stl-native/src/primitives'

export function OverlayScreen() {
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
        Overlay Components
      </Heading>
      <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>
        Popover, Tooltip, HoverCard, AlertDialog
      </Text>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Popover</Text>
        <Popover>
          <Popover.Trigger>
            <Button variant="outline">
              <Button.Text>Open Popover</Button.Text>
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text stl={{ fontWeight: '$600', fontSize: 14, mb: 8 }}>
              Popover Title
            </Text>
            <Text>This popover appears below the trigger with positioning.</Text>
            <Spacer size="sm" />
            <Button size="md" variant="outline" onPress={() => {}}>
              <Button.Text>Action</Button.Text>
            </Button>
          </Popover.Content>
        </Popover>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Tooltip</Text>
        <Text stl={{ fontSize: 12, color: '$neutral6' }}>Long press to see tooltip</Text>
        <Spacer size="sm" />
        <Row stl={{ gap: 12 }}>
          <Tooltip content="This is helpful information" placement="bottom">
            <Button variant="outline">
              <Button.Text>Bottom tooltip</Button.Text>
            </Button>
          </Tooltip>
          <Tooltip content="Appears above the trigger" placement="top">
            <Button variant="outline">
              <Button.Text>Top tooltip</Button.Text>
            </Button>
          </Tooltip>
        </Row>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>HoverCard</Text>
        <Text stl={{ fontSize: 12, color: '$neutral6' }}>Long press to see card</Text>
        <Spacer size="sm" />
        <HoverCard>
          <HoverCard.Trigger>
            <Button variant="outline">
              <Button.Text>@vlting</Button.Text>
            </Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Text stl={{ fontWeight: '$600', fontSize: 15 }}>@vlting</Text>
            <Spacer size="xs" />
            <Text>Open-source design system for cross-platform React applications.</Text>
            <Spacer size="sm" />
            <Row stl={{ gap: 16 }}>
              <Text>128 repos</Text>
              <Text>2.4k followers</Text>
            </Row>
          </HoverCard.Content>
        </HoverCard>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>AlertDialog</Text>
        <Button theme="destructive" onPress={() => setAlertOpen(true)}>
          <Button.Text>Delete Account</Button.Text>
        </Button>
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialog.Content>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account
              and remove all associated data.
            </AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <Button variant="outline" onPress={() => setAlertOpen(false)}>
                  <Button.Text>Cancel</Button.Text>
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button theme="destructive" onPress={() => setAlertOpen(false)}>
                  <Button.Text>Delete</Button.Text>
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Box>

      <Spacer size="xl" />
    </ScrollView>
  )
}
