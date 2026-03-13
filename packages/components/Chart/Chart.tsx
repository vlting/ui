import { createStub, noopHook } from '../_stub'

export type ChartContainerProps = Record<string, any>

export const useChartContext = noopHook
export const Chart = createStub('Chart', 'div')
