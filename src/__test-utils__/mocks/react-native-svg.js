// Mock for react-native-svg in Jest (jsdom environment)
const React = require('react')

const Svg = (props) => React.createElement('svg', props)
const G = (props) => React.createElement('g', props)
const Path = (props) => React.createElement('path', props)
const Circle = (props) => React.createElement('circle', props)
const Rect = (props) => React.createElement('rect', props)
const Line = (props) => React.createElement('line', props)
const Polyline = (props) => React.createElement('polyline', props)
const Polygon = (props) => React.createElement('polygon', props)
const Text = (props) => React.createElement('text', props)
const TSpan = (props) => React.createElement('tspan', props)
const TextPath = (props) => React.createElement('textPath', props)
const Defs = (props) => React.createElement('defs', props)
const Use = (props) => React.createElement('use', props)
const Symbol = (props) => React.createElement('symbol', props)
const LinearGradient = (props) => React.createElement('linearGradient', props)
const RadialGradient = (props) => React.createElement('radialGradient', props)
const Stop = (props) => React.createElement('stop', props)
const ClipPath = (props) => React.createElement('clipPath', props)
const Pattern = (props) => React.createElement('pattern', props)
const Mask = (props) => React.createElement('mask', props)
const Ellipse = (props) => React.createElement('ellipse', props)
const Image = (props) => React.createElement('image', props)
const ForeignObject = (props) => React.createElement('foreignObject', props)

module.exports = {
  __esModule: true,
  default: Svg,
  Svg,
  G,
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  Polygon,
  Text,
  TSpan,
  TextPath,
  Defs,
  Use,
  Symbol,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
  Ellipse,
  Image,
  ForeignObject,
}
