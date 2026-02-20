import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumbs, Card, PageHeader, Section } from '@vlting/ui/layout'
import { Button, RadioGroup, Sheet, Switch, Tooltip } from '@vlting/ui/primitives'
import {
  DatePicker,
  DragAndDropZone,
  FieldWrapper,
  FileUploader,
  FormContainer,
  HelperText,
  Label,
  MultiImageUploader,
  MultiSelect,
  RichTextEditor,
  Select,
  TagInput,
  TimePicker,
} from '@vlting/ui/forms'

import type { MultiSelectOption } from '@vlting/ui/forms'

const AUDIENCE_OPTIONS: MultiSelectOption[] = [
  { value: 'engineering',  label: 'Engineering'  },
  { value: 'design',       label: 'Design'       },
  { value: 'product',      label: 'Product'      },
  { value: 'marketing',    label: 'Marketing'    },
  { value: 'sales',        label: 'Sales'        },
  { value: 'all',          label: 'All Teams'    },
]

const CATEGORIES = ['Announcement', 'Update', 'Event', 'Blog', 'Policy']
const PRIORITIES = ['low', 'normal', 'high', 'urgent']

export function ComposePage() {
  const navigate = useNavigate()

  const [title, setTitle]           = useState('')
  const [audience, setAudience]     = useState<string[]>([])
  const [tags, setTags]             = useState<string[]>([])
  const [content, setContent]       = useState('')
  const [category, setCategory]     = useState('Announcement')
  const [publishDate, setPublishDate] = useState<Date | null>(null)
  const [publishTime, setPublishTime] = useState<Date | null>(null)
  const [priority, setPriority]     = useState('normal')
  const [notifyAll, setNotifyAll]   = useState(false)
  const [pinToTop, setPinToTop]     = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home',    onPress: () => navigate('/') },
          { label: 'Compose', onPress: () => navigate('/compose') },
        ]}
      />

      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title>Compose</PageHeader.Title>
          <PageHeader.Subtitle>Create a post or announcement</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      <Section.Content flexDirection="row" gap="$4" padding="$4" flexWrap="wrap" alignItems="flex-start">

        {/* ── Left — compose area ───────────────────────── */}
        <FormContainer flex={2} minWidth={300} gap="$4">
          <FieldWrapper>
            <Label htmlFor="compose-title">Title</Label>
            <input
              id="compose-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the announcement?"
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Audience</Label>
            <MultiSelect
              label="Teams to notify"
              options={AUDIENCE_OPTIONS}
              values={audience}
              onValuesChange={setAudience}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Tags</Label>
            <TagInput tags={tags} onTagsChange={setTags} placeholder="Add a tag" />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Body</Label>
            <RichTextEditor
              value={content}
              onValueChange={setContent}
              placeholder="Write something meaningful…"
              minHeight={240}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Attachments</Label>
            <HelperText>Drop files here or click to browse. Max 10 MB per file.</HelperText>
            <DragAndDropZone
              onDrop={(files) => console.log('dropped', files)}
              accept="*"
            >
              <FileUploader
                onFilesChange={(files) => console.log('files', files)}
                maxFiles={5}
              />
            </DragAndDropZone>
          </FieldWrapper>

          <FieldWrapper>
            <Label>Inline Images</Label>
            <MultiImageUploader maxImages={5} onImagesChange={() => {}} />
          </FieldWrapper>
        </FormContainer>

        {/* ── Right — publish settings ──────────────────── */}
        <Card flex={1} minWidth={260} padding="$4" gap="$4">
          <Card.Header>
            <Card.Title>Publish Settings</Card.Title>
          </Card.Header>
          <Card.Content gap="$3">
            <FieldWrapper>
              <Label htmlFor="compose-category">Category</Label>
              <Select id="compose-category" value={category} onValueChange={setCategory}>
                {CATEGORIES.map((c) => (
                  <Select.Item key={c} value={c}>{c}</Select.Item>
                ))}
              </Select>
            </FieldWrapper>

            <FieldWrapper>
              <Label>Publish Date</Label>
              <DatePicker
                value={publishDate}
                onValueChange={setPublishDate}
                placeholder="Select date"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label>Publish Time</Label>
              <TimePicker value={publishTime} onValueChange={setPublishTime} />
            </FieldWrapper>

            <FieldWrapper>
              <Label>Priority</Label>
              <RadioGroup value={priority} onValueChange={setPriority}>
                {PRIORITIES.map((p) => (
                  <RadioGroup.Item key={p} value={p} style={{ textTransform: 'capitalize' }}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </RadioGroup.Item>
                ))}
              </RadioGroup>
            </FieldWrapper>

            <Switch.Row>
              <Switch.LabelGroup>
                <Switch.Label>Notify all members</Switch.Label>
              </Switch.LabelGroup>
              <Switch checked={notifyAll} onCheckedChange={setNotifyAll} aria-label="Notify all members">
                <Switch.Thumb />
              </Switch>
            </Switch.Row>

            <Switch.Row>
              <Switch.LabelGroup>
                <Switch.Label>Pin to top</Switch.Label>
              </Switch.LabelGroup>
              <Switch checked={pinToTop} onCheckedChange={setPinToTop} aria-label="Pin to top">
                <Switch.Thumb />
              </Switch>
            </Switch.Row>

            <Tooltip>
              <Tooltip.Trigger>
                <Button variant="secondary" fullWidth onPress={() => setPreviewOpen(true)}>
                  <Button.Text variant="secondary">Preview</Button.Text>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Preview how this post will appear</Tooltip.Content>
            </Tooltip>

            <Section.Content flexDirection="row" gap="$2">
              <Button variant="secondary" flex={1} onPress={() => {}}>
                <Button.Text variant="secondary">Save Draft</Button.Text>
              </Button>
              <Button flex={1} onPress={() => {}}>
                <Button.Text>Publish</Button.Text>
              </Button>
            </Section.Content>
          </Card.Content>
        </Card>
      </Section.Content>

      {/* Preview sheet */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen} snapPoints={[85]}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" gap="$3">
          <Card.Title fontSize="$6">{title || 'Untitled Post'}</Card.Title>
          <Card.Description>
            {category} · {priority} priority
            {audience.length > 0 ? ` · ${audience.join(', ')}` : ''}
          </Card.Description>
          {tags.length > 0 && (
            <Card.Description>{tags.map((t) => `#${t}`).join(' ')}</Card.Description>
          )}
          <Card.Description style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
            {content || '(No body content yet)'}
          </Card.Description>
          <Button variant="secondary" onPress={() => setPreviewOpen(false)}>
            <Button.Text variant="secondary">Close Preview</Button.Text>
          </Button>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
