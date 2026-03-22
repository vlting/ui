import { Alert } from '../../../../packages/components/Alert/Alert.native'
import { Avatar } from '../../../../packages/components/Avatar/Avatar.native'
import { Badge } from '../../../../packages/components/Badge/Badge.native'
import { Card } from '../../../../packages/components/Card/Card.native'
import { Empty } from '../../../../packages/components/Empty/Empty.native'
import { Item } from '../../../../packages/components/Item/Item.native'
import { Progress } from '../../../../packages/components/Progress/Progress.native'
import { Separator } from '../../../../packages/components/Separator/Separator.native'
import { Box, Heading, Row, ScrollView, Spacer, Text } from '../../../../packages/stl-native/src/primitives'

export function DisplayScreen() {
  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
        Display Components
      </Heading>
      <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>
        Alert, Avatar, Badge, Card, Empty, Item, Progress, Separator
      </Text>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Alert</Text>
        <Alert.Root>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>This is a default alert message.</Alert.Description>
        </Alert.Root>
        <Spacer size="sm" />
        <Alert.Root variant="outline">
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>Please check your settings.</Alert.Description>
        </Alert.Root>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Avatar</Text>
        <Row stl={{ gap: 12 }}>
          <Avatar src="https://i.pravatar.cc/100?img=1" size="sm" fallback="JD" />
          <Avatar src="https://i.pravatar.cc/100?img=2" size="md" fallback="AB" />
          <Avatar src="https://invalid-url.test" size="lg" fallback="XY" />
        </Row>
        <Text stl={{ fontSize: 12, color: '$neutral6', mt: 4 }}>sm / md / lg (last shows fallback)</Text>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Badge</Text>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="subtle">Subtle</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Card</Text>
        <Card>
          <Card.Header>
            <Card.Title>Project Update</Card.Title>
            <Card.Description>Latest changes and improvements</Card.Description>
          </Card.Header>
          <Card.Content>
            <Text>Card content goes here with any layout.</Text>
          </Card.Content>
          <Card.Footer>
            <Text>Footer content</Text>
          </Card.Footer>
        </Card>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Progress</Text>
        <Progress value={65} />
        <Spacer size="sm" />
        <Progress value={30} />
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Separator</Text>
        <Text>Above</Text>
        <Separator />
        <Text>Below</Text>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Empty</Text>
        <Empty.Root>
          <Empty.Title>No items</Empty.Title>
          <Empty.Description>There are no items to display.</Empty.Description>
        </Empty.Root>
      </Box>

      <Box stl={{ mb: 28 }}>
        <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Item</Text>
        <Item>
          <Item.Content>
            <Item.Title>Account Settings</Item.Title>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Title>Notifications</Item.Title>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Title>Privacy</Item.Title>
          </Item.Content>
        </Item>
      </Box>

      <Spacer size="xl" />
    </ScrollView>
  )
}
