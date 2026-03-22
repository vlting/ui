import { ScrollView, StyleSheet, Text as RNText, View } from 'react-native'
import { Alert } from '../../../../packages/components/Alert/Alert.native'
import { Avatar } from '../../../../packages/components/Avatar/Avatar.native'
import { Badge } from '../../../../packages/components/Badge/Badge.native'
import { Card } from '../../../../packages/components/Card/Card.native'
import { Empty } from '../../../../packages/components/Empty/Empty.native'
import { Item } from '../../../../packages/components/Item/Item.native'
import { Progress } from '../../../../packages/components/Progress/Progress.native'
import { Separator } from '../../../../packages/components/Separator/Separator.native'
import { Text, Row, Spacer } from '../../../../packages/stl-native/src/primitives'

export function DisplayScreen() {
  return (
    <ScrollView style={styles.container}>
      <RNText style={styles.title}>Display Components</RNText>
      <RNText style={styles.subtitle}>
        Alert, Avatar, Badge, Card, Empty, Item, Progress, Separator
      </RNText>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Alert</RNText>
        <Alert.Root>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>This is a default alert message.</Alert.Description>
        </Alert.Root>
        <Spacer size="sm" />
        <Alert.Root variant="outline">
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>Please check your settings.</Alert.Description>
        </Alert.Root>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Avatar</RNText>
        <Row stl={{ gap: 12 }}>
          <Avatar src="https://i.pravatar.cc/100?img=1" size="sm" fallback="JD" />
          <Avatar src="https://i.pravatar.cc/100?img=2" size="md" fallback="AB" />
          <Avatar src="https://invalid-url.test" size="lg" fallback="XY" />
        </Row>
        <RNText style={styles.label}>sm / md / lg (last shows fallback)</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Badge</RNText>
        <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="subtle">Subtle</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Card</RNText>
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
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Progress</RNText>
        <Progress value={65} />
        <Spacer size="sm" />
        <Progress value={30} />
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Separator</RNText>
        <Text>Above</Text>
        <Separator />
        <Text>Below</Text>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Empty</RNText>
        <Empty.Root>
          <Empty.Title>No items</Empty.Title>
          <Empty.Description>There are no items to display.</Empty.Description>
        </Empty.Root>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Item</RNText>
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
      </View>

      <Spacer size="xl" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  label: { fontSize: 12, color: '#888', marginTop: 4 },
})
