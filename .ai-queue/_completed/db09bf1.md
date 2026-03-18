# Commit History
- 0296acd fix(components): replace remaining hardcoded height/width with size tokens
- db09bf1 Merge branch 'q/002' — remaining height/width token discipline

<!-- auto-queue -->
<!-- target-branch: fix/quality-audit -->

# Fix: Token Discipline — Remaining JSX & styledHtml violations

## Summary
- Command: height 44→$4, 36→$3
- DropdownMenu: height 32→$2.5 (×2)
- ContextMenu: height 32→$2.5 (×2)
- Menubar: height 40→$3.5, 28→$2, 32→$2.5
- Sidebar: Rail width 4→$0.5 (margin: 8 in style prop skipped — tokens don't resolve in style={{}})
- NavigationMenu: Indicator height 2→$0.25
- Breadcrumb/Checkbox/RadioGroup: gap values in style={{}} on native elements — kept as literals per Rule 2
