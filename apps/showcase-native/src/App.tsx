import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StlProvider } from '../../../packages/stl-native/src/providers/StlProvider'
import { ComponentsScreen } from './screens/ComponentsScreen'
import { HomeScreen } from './screens/HomeScreen'
import { HooksScreen } from './screens/HooksScreen'
import { PrimitivesScreen } from './screens/PrimitivesScreen'
import { StylingScreen } from './screens/StylingScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <StlProvider defaultColorMode="light">
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { fontWeight: '700' },
            tabBarActiveTintColor: '#0066ff',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Styling" component={StylingScreen} />
          <Tab.Screen name="Primitives" component={PrimitivesScreen} />
          <Tab.Screen name="Components" component={ComponentsScreen} />
          <Tab.Screen name="Hooks" component={HooksScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StlProvider>
  )
}
