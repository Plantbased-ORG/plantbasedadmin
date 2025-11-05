'use client';

interface ImageUploadProps {
  label: string;
  name: string;
  value: File | null;
  onChange: (file: File | null, fieldName: string) => void;
  required?: boolean;
  colorScheme?: 'purple' | 'blue' | 'green' | 'red' | 'yellow';
}

export default function ImageUpload({
  label,
  name,
  value,
  onChange,
  required = false,
  colorScheme = 'purple'
}: ImageUploadProps) {
  const colorClasses = {
    purple: 'file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200',
    blue: 'file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200',
    green: 'file:bg-green-100 file:text-green-700 hover:file:bg-green-200',
    red: 'file:bg-red-100 file:text-red-700 hover:file:bg-red-200',
    yellow: 'file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should not exceed 5MB');
        return;
      }

      onChange(file, name);
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'} (Max 5MB)
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required={required}
        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 ${colorClasses[colorScheme]}`}
      />
      {value && (
        <p className="text-xs text-green-600 mt-1">✓ {value.name}</p>
      )}
    </div>
  );
}