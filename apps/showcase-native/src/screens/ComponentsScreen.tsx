import { useNavigation } from '@react-navigation/native'
import { Box, Heading, Pressable, ScrollView, Text } from '../../../../packages/stl-native/src/primitives'

const SCREENS = [
  { name: 'Display', desc: 'Alert, Avatar, Badge, Card, Empty, Item, Progress, Separator' },
  { name: 'Forms', desc: 'Button, Input, Textarea, Checkbox, Switch, RadioGroup, Toggle, Slider, Field' },
  { name: 'Disclosure', desc: 'Accordion, Collapsible, Dialog, Sheet, Drawer, Toast' },
  { name: 'Overlays', desc: 'Popover, Tooltip, HoverCard, AlertDialog' },
] as const

export function ComponentsScreen() {
  const navigation = useNavigation<any>()

  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
        Components
      </Heading>
      <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>
        Native @vlting/ui components organized by category.
      </Text>

      <Box stl={{ gap: 12 }}>
        {SCREENS.map((s) => (
          <Pressable
            key={s.name}
            stl={{ p: 20, radius: 8, borderWidth: 1, borderColor: '$neutral4', bg: '$panel' }}
            onPress={() => navigation.navigate(s.name)}
          >
            <Text stl={{ fontWeight: '$600', fontSize: 16, mb: 4 }}>{s.name}</Text>
            <Text stl={{ fontSize: 13, color: '$neutral6' }}>{s.desc}</Text>
          </Pressable>
        ))}
      </Box>
    </ScrollView>
  )
}
