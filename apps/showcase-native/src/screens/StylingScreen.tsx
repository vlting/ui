import { Box, Heading, Pressable, Row, ScrollView, Text } from '../../../../packages/stl-native/src/primitives'
import { useColorMode } from '../../../../packages/stl-native/src/hooks/useColorMode'

const palettes = ['primary', 'secondary', 'neutral', 'tomato', 'amber', 'grass', 'aqua', 'indigo', 'plum']
const steps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

export function StylingScreen() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <ScrollView stl={{ flex: 1, p: 20 }}>
      <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 20 }}>
        Styling & Tokens
      </Heading>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Color Mode</Text>
        <Row stl={{ gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Text>Current: {colorMode}</Text>
          <Pressable
            onPress={toggleColorMode}
            stl={{
              px: 12,
              py: 6,
              borderRadius: 6,
              backgroundColor: '$primary9',
            }}
          >
            <Text stl={{ color: '$panel', fontWeight: '600', fontSize: 14 }}>Toggle</Text>
          </Pressable>
        </Row>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Color Palettes</Text>
        <Text stl={{ fontSize: 13, color: '$neutral6', mb: 12 }}>
          Token references ($primary1-12, $tomato1-12, etc.) resolve at runtime via the style
          resolver.
        </Text>
        {palettes.map((palette) => (
          <Box key={palette} stl={{ mb: 12 }}>
            <Text stl={{ fontSize: 13, fontWeight: '600', mb: 4, textTransform: 'capitalize' }}>
              {palette}
            </Text>
            <Row stl={{ gap: 4 }}>
              {steps.slice(0, 6).map((step) => (
                <Box
                  key={step}
                  stl={{
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    backgroundColor: `$${palette}${step}` as any,
                  }}
                />
              ))}
            </Row>
          </Box>
        ))}
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Space Scale</Text>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((step) => (
          <Row key={step} stl={{ alignItems: 'center', mb: 8, gap: 8 }}>
            <Text stl={{ width: 30, fontSize: 12 }}>${step}</Text>
            <Box
              stl={{
                height: 20,
                backgroundColor: '$primary9',
                borderRadius: 4,
                width: Number(step) * 20,
              }}
            />
          </Row>
        ))}
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Border Radius</Text>
        <Row stl={{ gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {['0', '4', '8', '12', '16', '9999'].map((r) => (
            <Box
              key={r}
              stl={{
                width: 48,
                height: 48,
                backgroundColor: '$neutral4',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: Number(r),
              }}
            >
              <Text stl={{ fontSize: 10 }}>{r}</Text>
            </Box>
          ))}
        </Row>
      </Box>

      <Box stl={{ mb: 32 }}>
        <Text stl={{ fontSize: 18, fontWeight: '$600', mb: 12 }}>Font Sizes</Text>
        {[12, 14, 16, 18, 20, 24, 32].map((size) => (
          <Text key={size} stl={{ fontSize: size, mb: 8 }}>
            ${size} — The quick brown fox
          </Text>
        ))}
      </Box>
    </ScrollView>
  )
}
