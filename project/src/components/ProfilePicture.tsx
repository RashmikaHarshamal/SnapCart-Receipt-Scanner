import React, { useState, useRef } from 'react';
import { User } from 'lucide-react';

interface ProfilePictureProps {
  currentPicture: string | null;
  onUpdate: (newPicture: string) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  currentPicture,
  onUpdate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return false;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    setError(null);
    
    if (!validateFile(file)) {
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      // In a real application, you would upload the file here
      onUpdate(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`relative w-32 h-32 rounded-full overflow-hidden cursor-pointer ${
          isDragging ? 'border-2 border-indigo-500' : 'border border-gray-300'
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {(preview || currentPicture) ? (
          <img
            src={preview || currentPicture || ''}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Click or drag and drop to change profile picture
        </p>
        <p className="text-xs text-gray-500">
          (Maximum file size: 5MB)
        </p>
      </div>
    </div>
  );
};

export default ProfilePicture;