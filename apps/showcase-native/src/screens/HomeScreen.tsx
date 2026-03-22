import { Box, Column, Heading, ScrollView, Text } from '../../../../packages/stl-native/src/primitives'

export function HomeScreen() {
  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 28, fontWeight: '$800', mb: 8 }}>
        @vlting/stl Showcase
      </Heading>
      <Text stl={{ fontSize: 16, color: '$neutral7', mb: 24, lineHeight: 22 }}>
        Native kitchen-sink demo of the STL design system for React Native.
      </Text>

      <Column stl={{ gap: 12 }}>
        {[
          { label: 'Styling', desc: 'Token scales, colors, themes' },
          { label: 'Primitives', desc: 'Box, Row, Column, Text, Grid' },
          { label: 'Hooks', desc: 'Native hooks: colorMode, conditions, layout' },
        ].map((item) => (
          <Box
            key={item.label}
            stl={{ p: 20, radius: 8, borderWidth: 1, borderColor: '$neutral4', bg: '$panel' }}
          >
            <Text stl={{ fontWeight: '$600', fontSize: 16, mb: 4 }}>{item.label}</Text>
            <Text stl={{ fontSize: 13, color: '$neutral6' }}>{item.desc}</Text>
          </Box>
        ))}
      </Column>

      <Box stl={{ mt: 24, p: 16, bg: '$primary2', radius: 8 }}>
        <Text stl={{ fontWeight: '$600', fontSize: 14, mb: 4 }}>Platform Coverage</Text>
        <Text stl={{ fontSize: 13, color: '$neutral8', lineHeight: 20 }}>
          This app showcases stl-native primitives, native hooks, and the StlProvider.
          Web-only components (DOM-based) are available in the showcase-web app.
        </Text>
      </Box>
    </ScrollView>
  )
}
