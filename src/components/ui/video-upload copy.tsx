import { useState, useCallback } from 'react'
import { Button } from './button'
import { Trash2, Upload } from 'lucide-react'

interface VideoUploadProps {
  value: File | string | null
  onChange: (file: File | null) => void
}

export const VideoUpload = ({ value, onChange }: VideoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' ? value : null
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file)
        setPreview(url)
        onChange(file)
      }
    }
  }, [onChange])

  const handleRemove = useCallback(() => {
    setPreview(null)
    onChange(null)
  }, [onChange])

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative">
          <video 
            src={preview} 
            controls 
            className="w-full h-64 object-contain bg-black rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4" />
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs">MP4, MOV, AVI (Max 50MB)</p>
            </div>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
      )}
    </div>
  )
}