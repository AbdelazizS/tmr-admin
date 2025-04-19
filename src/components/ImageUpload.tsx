import { useState, useCallback, useRef } from 'react';
import { UploadCloud, X, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value?: string;
  onChange: (value?: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsLoading(true);

      try {
        // Simulated upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In real apps, upload the file and get the URL from the response
        const objectUrl = URL.createObjectURL(file);
        onChange(objectUrl);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsLoading(false);
        // Reset input so same file can be re-selected
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    },
    [onChange]
  );

  const handleRemove = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const triggerFileInput = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={disabled || isLoading}
      />

      {value ? (
        <>
          <div className="relative group">
            <img
              src={value}
              alt="Uploaded"
              className="rounded-md w-full h-48 object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {!disabled && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={triggerFileInput}
              disabled={isLoading}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Replace Image
            </Button>
          )}
        </>
      ) : (
        <label
          onClick={triggerFileInput}
          className="flex flex-col items-center justify-center h-48 w-full rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary cursor-pointer transition-colors relative"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, JPEG (MAX. 5MB)
            </p>
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </label>
      )}
    </div>
  );
};
