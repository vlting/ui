import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const EmployeeDirectoryTableFrame = styled(YStack, {})

export type EmployeeDirectoryTableProps = GetProps<typeof EmployeeDirectoryTableFrame>

export const EmployeeDirectoryTable = EmployeeDirectoryTableFrame
