import { styled } from '../stl-react/src/config'

const KbdFrame = styled(
  "kbd",
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "$code",
    backgroundColor: "$surface2",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$borderColor",
    borderBottomWidth: "2px",
    color: "$color",
  },
  {
    size: {
      sm: { fontSize: "$12", borderRadius: "$2", minWidth: "20px", paddingLeft: "4px", paddingRight: "4px", paddingTop: "1px", paddingBottom: "1px" },
      md: { fontSize: "$14", borderRadius: "$2", minWidth: "24px", paddingLeft: "6px", paddingRight: "6px", paddingTop: "2px", paddingBottom: "2px" },
    },
  },
  "Kbd"
)

export interface KbdProps {
  children: string
  size?: 'sm' | 'md'
}

export function Kbd({ children, size = 'md' }: KbdProps) {
  return <KbdFrame size={size}>{children}</KbdFrame>
}
