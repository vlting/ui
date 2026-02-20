import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Bold, Italic, Link, List, ListOrdered, Underline, View, YStack } from '../_jsx-compat'
import type { RichTextEditorProps } from './RichTextEditor'

type ToolbarProps = {
  editor: ReturnType<typeof useEditor>
}

const Toolbar = memo(function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null

  const actions = [
    {
      Icon: Bold,
      label: 'Bold',
      active: editor.isActive('bold'),
      onPress: () => editor.chain().focus().toggleBold().run(),
    },
    {
      Icon: Italic,
      label: 'Italic',
      active: editor.isActive('italic'),
      onPress: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      Icon: Underline,
      label: 'Underline',
      active: editor.isActive('underline'),
      onPress: () => editor.chain().focus().toggleUnderline?.().run(),
    },
    {
      Icon: List,
      label: 'Bullet list',
      active: editor.isActive('bulletList'),
      onPress: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      Icon: ListOrdered,
      label: 'Ordered list',
      active: editor.isActive('orderedList'),
      onPress: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      Icon: Link,
      label: 'Link',
      active: editor.isActive('link'),
      onPress: () => {
        const url = window.prompt('URL')
        if (url) editor.chain().focus().setLink?.({ href: url }).run()
      },
    },
  ]

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 4,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'var(--borderColor, #e0e0e0)',
        backgroundColor: 'var(--background, #fff)',
        flexWrap: 'wrap',
      }}
      role="toolbar"
      aria-label="Text formatting"
    >
      {actions.map(({ Icon, label, active, onPress }) => (
        <View
          key={label}
          width={28}
          height={28}
          borderRadius="$2"
          alignItems="center"
          justifyContent="center"
          backgroundColor={active ? '$color3' : undefined}
          onPress={onPress}
          aria-label={label}
          aria-pressed={active}
        >
          <Icon size={14} color="$color" />
        </View>
      ))}
    </View>
  )
})

function WebEditor({
  value = '',
  onChange,
  placeholder,
  disabled = false,
  error = false,
  minHeight = 120,
  maxHeight,
  testID,
}: RichTextEditorProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleUpdate = useCallback(
    (html: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => onChange?.(html), 300)
    },
    [onChange],
  )

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': placeholder ?? 'Rich text editor',
        ...(placeholder ? { 'data-placeholder': placeholder } : {}),
      },
    },
    onUpdate: ({ editor: e }) => handleUpdate(e.getHTML()),
  })

  // Keep editor editable in sync with disabled prop
  useEffect(() => {
    editor?.setEditable(!disabled)
  }, [editor, disabled])

  return (
    <YStack
      testID={testID}
      borderWidth={1}
      borderColor={error ? '$red10' : '$borderColor'}
      borderRadius="$3"
      overflow="hidden"
      opacity={disabled ? 0.5 : 1}
    >
      <Toolbar editor={editor} />
      <YStack
        minHeight={minHeight}
        maxHeight={maxHeight}
        padding="$3"
        overflow={maxHeight ? 'scroll' : 'visible'}
      >
        <EditorContent editor={editor} />
      </YStack>
    </YStack>
  )
}

export function createWebRichTextEditor(): React.ComponentType<RichTextEditorProps> {
  return WebEditor
}
