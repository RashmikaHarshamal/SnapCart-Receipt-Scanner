import React, { useState, useEffect } from 'react';
import { userProfileApi, UserProfile } from '../services/api';
import ProfilePicture from '../components/ProfilePicture';
import PasswordChange from '../components/PasswordChange';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    profilePicture: null
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await userProfileApi.getProfile();
      setProfile(data);
      setEditedProfile(data);
      setError(null);
    } catch (err) {
      setError('Failed to load profile. Please try again later.');
      // Set default data for development
      setProfile({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        profilePicture: null
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await userProfileApi.updateProfile(editedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (profile) {
      setEditedProfile(profile);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setEditedProfile(profile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <p className="text-red-600">Failed to load profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <ProfilePicture
              currentPicture={profile.profilePicture}
              onUpdate={(newPicture) => {
                setProfile({ ...profile, profilePicture: newPicture });
              }}
            />
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.phone}</p>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Password Change Section */}
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Password Settings</h2>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {showPasswordChange ? 'Cancel' : 'Change Password'}
              </button>
            </div>
            {showPasswordChange && (
              <PasswordChange
                onSuccess={() => {
                  setShowPasswordChange(false);
                  // You could show a success message here
                }}
                onCancel={() => setShowPasswordChange(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
