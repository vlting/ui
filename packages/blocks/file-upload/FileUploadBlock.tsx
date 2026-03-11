import type { ComponentType, ReactNode } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Progress } from '../../components/Progress'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const CardJsx = Card as AnyFC
const ProgressJsx = Progress as AnyFC

// -- Types --

export type FileUploadBlockVariant = 'dropzone' | 'compact' | 'gallery'

export interface UploadFile {
  id: string
  name: string
  size: number
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
  previewUrl?: string
  error?: string
}

export interface FileUploadBlockProps extends BlockProps {
  variant: FileUploadBlockVariant
  title?: string
  description?: string
  accept?: string
  maxSize?: number
  multiple?: boolean
  files?: UploadFile[]
  onDrop?: (files: File[]) => void
  onRemove?: (id: string) => void
  onRetry?: (id: string) => void
  icon?: ReactNode
}

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

// -- Helpers --

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileItem({
  file,
  onRemove,
  onRetry,
}: {
  file: UploadFile
  onRemove?: (id: string) => void
  onRetry?: (id: string) => void
}) {
  return (
    <div
      style={{
        ...row,
        gap: 12,
        padding: 12,
        alignItems: 'center',
        borderRadius: 'var(--radius3)',
        backgroundColor: 'var(--background2)',
      }}
    >
      <div style={{ ...col, flex: 1, gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-body)' }}>
          {file.name}
        </span>
        <span style={{ fontSize: 12, opacity: 0.6, fontFamily: 'var(--font-body)' }}>
          {formatBytes(file.size)}
          {file.error && (
            <span style={{ color: 'var(--colorError)', marginLeft: 8 }}>
              {file.error}
            </span>
          )}
        </span>
        {file.status === 'uploading' && (
          <ProgressJsx value={file.progress} aria-label={`Uploading ${file.name}`} />
        )}
      </div>
      <div style={{ ...row, gap: 8 }}>
        {file.status === 'error' && onRetry && (
          <ButtonJsx
            variant="ghost"
            size="sm"
            onPress={() => onRetry(file.id)}
            aria-label={`Retry ${file.name}`}
          >
            <ButtonTextJsx>Retry</ButtonTextJsx>
          </ButtonJsx>
        )}
        {onRemove && (
          <ButtonJsx
            variant="ghost"
            size="sm"
            onPress={() => onRemove(file.id)}
            aria-label={`Remove ${file.name}`}
          >
            <ButtonTextJsx>Remove</ButtonTextJsx>
          </ButtonJsx>
        )}
      </div>
    </div>
  )
}

// -- Main component --

export function FileUploadBlock(props: FileUploadBlockProps) {
  switch (props.variant) {
    case 'dropzone':
      return <DropzoneUpload {...props} />
    case 'compact':
      return <CompactUpload {...props} />
    case 'gallery':
      return <GalleryUpload {...props} />
  }
}

// -- Dropzone variant --

function DropzoneUpload({
  title = 'Upload files',
  description = 'Drag & drop files here, or click to browse',
  files = [],
  onDrop,
  onRemove,
  onRetry,
  icon,
  accept,
  maxSize,
}: FileUploadBlockProps) {
  return (
    <CardJsx style={{ width: '100%', maxWidth: 600, padding: 16 }}>
      <div style={{ ...col, gap: 16 }}>
        <div
          role="button"
          tabIndex={0}
          aria-label={title}
          onDragOver={(e: React.DragEvent) => e.preventDefault()}
          onDrop={(e: React.DragEvent) => {
            e.preventDefault()
            const dropped = Array.from(e.dataTransfer.files)
            onDrop?.(dropped)
          }}
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            if (accept) input.accept = accept
            input.multiple = true
            input.onchange = () => {
              if (input.files) onDrop?.(Array.from(input.files))
            }
            input.click()
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              ;(e.target as HTMLElement).click()
            }
          }}
          style={{
            ...col,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 32,
            border: '2px dashed var(--borderColor)',
            borderRadius: 'var(--radius4)',
            cursor: 'pointer',
            minHeight: 160,
          }}
        >
          {icon && <div style={{ fontSize: 32, opacity: 0.5 }}>{icon}</div>}
          <span style={{ fontSize: 16, fontWeight: 500, fontFamily: 'var(--font-body)' }}>
            {title}
          </span>
          <span
            style={{
              fontSize: 14,
              opacity: 0.6,
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
            }}
          >
            {description}
          </span>
          {maxSize && (
            <span style={{ fontSize: 12, opacity: 0.5, fontFamily: 'var(--font-body)' }}>
              Max size: {formatBytes(maxSize)}
            </span>
          )}
        </div>
        {files.length > 0 && (
          <div style={{ ...col, gap: 8 }}>
            {files.map((file) => (
              <FileItem key={file.id} file={file} onRemove={onRemove} onRetry={onRetry} />
            ))}
          </div>
        )}
      </div>
    </CardJsx>
  )
}

// -- Compact variant --

function CompactUpload({
  title = 'Upload',
  files = [],
  onDrop,
  onRemove,
  onRetry,
  accept,
}: FileUploadBlockProps) {
  return (
    <div style={{ ...col, gap: 12, width: '100%', maxWidth: 500 }}>
      <div style={{ ...row, gap: 12, alignItems: 'center' }}>
        <ButtonJsx
          variant="outline"
          onPress={() => {
            const input = document.createElement('input')
            input.type = 'file'
            if (accept) input.accept = accept
            input.multiple = true
            input.onchange = () => {
              if (input.files) onDrop?.(Array.from(input.files))
            }
            input.click()
          }}
          aria-label={title}
        >
          <ButtonTextJsx>{title}</ButtonTextJsx>
        </ButtonJsx>
        {files.length > 0 && (
          <span style={{ fontSize: 14, opacity: 0.6, fontFamily: 'var(--font-body)' }}>
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>
      {files.length > 0 && (
        <div style={{ ...col, gap: 8 }}>
          {files.map((file) => (
            <FileItem key={file.id} file={file} onRemove={onRemove} onRetry={onRetry} />
          ))}
        </div>
      )}
    </div>
  )
}

// -- Gallery variant --

function GalleryUpload({
  title = 'Upload images',
  description = 'Drag & drop images here',
  files = [],
  onDrop,
  onRemove,
  onRetry: _onRetry,
  accept = 'image/*',
}: FileUploadBlockProps) {
  void _onRetry
  return (
    <CardJsx style={{ width: '100%', maxWidth: 700, padding: 16 }}>
      <div style={{ ...col, gap: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-body)' }}>
          {title}
        </span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: 12,
          }}
        >
          {files.map((file) => (
            <div
              key={file.id}
              style={{
                ...col,
                width: 120,
                height: 120,
                borderRadius: 'var(--radius3)',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'var(--background2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {file.previewUrl ? (
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span
                  style={{ fontSize: 12, opacity: 0.5, textAlign: 'center', padding: 8 }}
                >
                  {file.name}
                </span>
              )}
              {file.status === 'uploading' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 4,
                    backgroundColor: 'var(--background)',
                  }}
                >
                  <ProgressJsx
                    value={file.progress}
                    aria-label={`Uploading ${file.name}`}
                  />
                </div>
              )}
              {onRemove && (
                <div style={{ position: 'absolute', top: 4, right: 4 }}>
                  <ButtonJsx
                    variant="ghost"
                    size="sm"
                    onPress={() => onRemove(file.id)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <ButtonTextJsx>x</ButtonTextJsx>
                  </ButtonJsx>
                </div>
              )}
            </div>
          ))}
          {/* Add button */}
          <div
            role="button"
            tabIndex={0}
            aria-label={description}
            onDragOver={(e: React.DragEvent) => e.preventDefault()}
            onDrop={(e: React.DragEvent) => {
              e.preventDefault()
              onDrop?.(Array.from(e.dataTransfer.files))
            }}
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = accept
              input.multiple = true
              input.onchange = () => {
                if (input.files) onDrop?.(Array.from(input.files))
              }
              input.click()
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                ;(e.target as HTMLElement).click()
              }
            }}
            style={{
              ...col,
              width: 120,
              height: 120,
              borderRadius: 'var(--radius3)',
              border: '2px dashed var(--borderColor)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 24, opacity: 0.4 }}>+</span>
            <span style={{ fontSize: 11, opacity: 0.5, fontFamily: 'var(--font-body)' }}>
              Add
            </span>
          </div>
        </div>
      </div>
    </CardJsx>
  )
}
