'use client';

import ImageUpload from './ImageUpload';

interface ProgramBasicInfoProps {
  name: string;
  shortDescription: string;
  mainImage: File | null;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (file: File | null, fieldName: string) => void;
}

export default function ProgramBasicInfo({
  name,
  shortDescription,
  mainImage,
  onNameChange,
  onDescriptionChange,
  onImageChange
}: ProgramBasicInfoProps) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3">Card Display</h4>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Program Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={onNameChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900"
            placeholder="e.g., Obesity"
          />
        </div>

        <ImageUpload
          label="Card Image"
          name="mainImage"
          value={mainImage}
          onChange={onImageChange}
          required
          colorScheme="purple"
        />

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={onDescriptionChange}
            required
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900 resize-none"
            placeholder="Brief description..."
          />
        </div>
      </div>
    </div>
  );
}