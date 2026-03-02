import type { ComponentType, ReactNode } from 'react'
import { Text, View } from 'tamagui'
import { Button } from '../../components/Button'
import { Separator } from '../../primitives/Separator'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const ButtonJsx = Button as AnyFC
const _SeparatorJsx = Separator as AnyFC

export interface MasterDetailProps {
  masterContent: ReactNode
  detailContent?: ReactNode
  masterWidth?: number | string
  showDetail?: boolean
  onBack?: () => void
  masterHeader?: ReactNode
  detailHeader?: ReactNode
}

export function MasterDetail({
  masterContent,
  detailContent,
  masterWidth = 320,
  showDetail = false,
  onBack,
  masterHeader,
  detailHeader,
}: MasterDetailProps) {
  if (showDetail && detailContent) {
    return (
      <ViewJsx flex={1} flexDirection="column">
        <ViewJsx
          flexDirection="row"
          alignItems="center"
          gap="$2"
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          display="none"
          $md={{ display: 'flex' }}
        >
          {onBack && (
            <ButtonJsx variant="ghost" size="sm" onPress={onBack}>
              <TextJsx fontSize="$4" fontFamily="$body" color="$color">
                ← Back
              </TextJsx>
            </ButtonJsx>
          )}
          {detailHeader}
        </ViewJsx>

        <ViewJsx flex={1} flexDirection="row">
          <ViewJsx
            width={masterWidth}
            borderRightWidth={1}
            borderRightColor="$borderColor"
            $md={{ display: 'none' }}
          >
            {masterHeader && (
              <ViewJsx
                padding="$3"
                borderBottomWidth={1}
                borderBottomColor="$borderColor"
              >
                {masterHeader}
              </ViewJsx>
            )}
            {masterContent}
          </ViewJsx>

          <ViewJsx flex={1}>{detailContent}</ViewJsx>
        </ViewJsx>
      </ViewJsx>
    )
  }

  return (
    <ViewJsx flex={1} flexDirection="row">
      <ViewJsx
        width={masterWidth}
        borderRightWidth={1}
        borderRightColor="$borderColor"
        $md={{ width: '100%', borderRightWidth: 0 }}
      >
        {masterHeader && (
          <ViewJsx padding="$3" borderBottomWidth={1} borderBottomColor="$borderColor">
            {masterHeader}
          </ViewJsx>
        )}
        {masterContent}
      </ViewJsx>

      <ViewJsx flex={1} $md={{ display: 'none' }}>
        {detailHeader && (
          <ViewJsx padding="$3" borderBottomWidth={1} borderBottomColor="$borderColor">
            {detailHeader}
          </ViewJsx>
        )}
        {detailContent}
      </ViewJsx>
    </ViewJsx>
  )
}
