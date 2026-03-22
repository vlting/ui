import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { getTheme } from '../../../packages/stl-native/src/config/theme'
import { useColorMode } from '../../../packages/stl-native/src/hooks/useColorMode'
import { StlProvider } from '../../../packages/stl-native/src/providers/StlProvider'
import { ComponentsScreen } from './screens/ComponentsScreen'
import { DisclosureScreen } from './screens/DisclosureScreen'
import { DisplayScreen } from './screens/DisplayScreen'
import { FormScreen } from './screens/FormScreen'
import { HomeScreen } from './screens/HomeScreen'
import { HooksScreen } from './screens/HooksScreen'
import { OverlayScreen } from './screens/OverlayScreen'
import { PrimitivesScreen } from './screens/PrimitivesScreen'
import { StylingScreen } from './screens/StylingScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function ComponentsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ComponentsIndex" component={ComponentsScreen} options={{ title: 'Components' }} />
      <Stack.Screen name="Display" component={DisplayScreen} />
      <Stack.Screen name="Forms" component={FormScreen} />
      <Stack.Screen name="Disclosure" component={DisclosureScreen} />
      <Stack.Screen name="Overlays" component={OverlayScreen} />
    </Stack.Navigator>
  )
}

function AppContent() {
  const { colorMode } = useColorMode()
  const theme = getTheme()
  const colors = theme[colorMode].color

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.$panel },
          headerTitleStyle: { fontWeight: '700' },
          tabBarActiveTintColor: colors.$primary9,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Styling" component={StylingScreen} />
        <Tab.Screen name="Primitives" component={PrimitivesScreen} />
        <Tab.Screen
          name="Components"
          component={ComponentsStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Hooks" component={HooksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <StlProvider defaultColorMode="light">
      <AppContent />
    </StlProvider>
  )
}
