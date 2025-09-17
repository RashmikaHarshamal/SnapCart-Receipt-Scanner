import React, { useState } from 'react';

interface ProfilePictureProps {
  currentPicture: string | null;
  onUpdate: (newPicture: string | null) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ currentPicture, onUpdate }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server here
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      onUpdate(imageUrl);
    }
  };

  return (
    <div
      className="relative w-32 h-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
        {currentPicture ? (
          <img
            src={currentPicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      {isHovering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className="text-white text-sm">Change Photo</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;