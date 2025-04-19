import { X } from 'lucide-react'

interface ImagePreviewProps {
  src: string
  alt: string
  onRemove: () => void
}

export const ImagePreview = ({ src, alt, onRemove }: ImagePreviewProps) => {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className="w-full h-32 object-cover rounded-md"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}