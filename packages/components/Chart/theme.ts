interface ResolvedTokens {
  background: string
  color: string
  colorSubtitle: string
  borderColor: string
  color4: string
}

/** Default chart colors for auto-assignment when ChartConfig doesn't specify colors */
export const defaultChartColors = [
  '#3b8fdb', // blue[5]
  '#2d9d5e', // green[5]
  '#d98c2e', // orange[5]
  '#8b5cf6', // purple[5]
  '#dc4a4a', // red[5]
  '#e44d8a', // pink[5]
  '#c9a820', // yellow[5]
]

interface VictoryAxisStyle {
  axis: { stroke: string }
  grid: { stroke: string; strokeOpacity: number }
  tickLabels: { fill: string; fontSize: number; fontFamily: string }
  axisLabel: { fill: string; fontSize: number }
}

interface VictoryTooltipTheme {
  flyoutStyle: { fill: string; stroke: string; strokeWidth: number }
  style: { fill: string; fontSize: number }
}

interface ChartTheme {
  axis: { style: VictoryAxisStyle }
  tooltip: VictoryTooltipTheme
  chart: { padding: { top: number; bottom: number; left: number; right: number } }
}

/**
 * Creates a Victory-compatible theme object from resolved Tamagui token values.
 * This keeps the chart styling aligned with the active Tamagui theme.
 */
export function createChartTheme(resolvedTokens: ResolvedTokens): ChartTheme {
  return {
    axis: {
      style: {
        axis: {
          stroke: resolvedTokens.borderColor,
        },
        grid: {
          stroke: resolvedTokens.borderColor,
          strokeOpacity: 0.3,
        },
        tickLabels: {
          fill: resolvedTokens.colorSubtitle,
          fontSize: 12,
          fontFamily: 'inherit',
        },
        axisLabel: {
          fill: resolvedTokens.colorSubtitle,
          fontSize: 14,
        },
      },
    },
    tooltip: {
      flyoutStyle: {
        fill: resolvedTokens.background,
        stroke: resolvedTokens.borderColor,
        strokeWidth: 1,
      },
      style: {
        fill: resolvedTokens.color,
        fontSize: 12,
      },
    },
    chart: {
      padding: { top: 20, bottom: 40, left: 50, right: 20 },
    },
  }
}
