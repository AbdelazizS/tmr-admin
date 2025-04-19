import { Upload } from 'lucide-react'
import { useCallback } from 'react'

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  onUpload: (files: File[]) => void
}

export const FileUpload = ({ accept, multiple = false, onUpload }: FileUploadProps) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files))
      e.target.value = '' // Reset input
    }
  }, [onUpload])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files))
    }
  }, [onUpload])

  return (
    <div
      className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p className="text-sm text-center">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}