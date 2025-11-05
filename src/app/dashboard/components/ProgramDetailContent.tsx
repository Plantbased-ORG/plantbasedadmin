'use client';

import ImageUpload from './ImageUpload';
import TextAreaField from './TextAreaField';

interface ProgramDetailContentProps {
  programName: string;
  introDescription: string;
  mainContentImage: File | null;
  whatCauses: string;
  whatCausesImage: File | null;
  healthRisks: string;
  healthRisksImage: File | null;
  strategies: string;
  strategiesImage: File | null;
  conclusion: string;
  conclusionImage: File | null;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (file: File | null, fieldName: string) => void;
}

export default function ProgramDetailContent({
  programName,
  introDescription,
  mainContentImage,
  whatCauses,
  whatCausesImage,
  healthRisks,
  healthRisksImage,
  strategies,
  strategiesImage,
  conclusion,
  conclusionImage,
  onChange,
  onImageChange
}: ProgramDetailContentProps) {
  return (
    <details className="border border-gray-200 rounded-lg">
      <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
        Program Detail Content (Click to expand)
      </summary>
      <div className="p-4 space-y-4 border-t">
        {/* Introduction */}
        <TextAreaField
          label="Introduction"
          name="introDescription"
          value={introDescription}
          onChange={onChange}
          rows={3}
          required
        />
        <ImageUpload
          label="Intro Image"
          name="mainContentImage"
          value={mainContentImage}
          onChange={onImageChange}
          required
          colorScheme="blue"
        />

        {/* What Causes */}
        <TextAreaField
          label={`What Causes ${programName || '...'}?`}
          name="whatCauses"
          value={whatCauses}
          onChange={onChange}
          rows={4}
          required
        />
        <ImageUpload
          label="Causes Image"
          name="whatCausesImage"
          value={whatCausesImage}
          onChange={onImageChange}
          required
          colorScheme="green"
        />

        {/* Health Risks */}
        <TextAreaField
          label="Health Risks"
          name="healthRisks"
          value={healthRisks}
          onChange={onChange}
          rows={4}
          required
        />
        <ImageUpload
          label="Risks Image"
          name="healthRisksImage"
          value={healthRisksImage}
          onChange={onImageChange}
          required
          colorScheme="red"
        />

        {/* Strategies */}
        <TextAreaField
          label="Strategies"
          name="strategies"
          value={strategies}
          onChange={onChange}
          rows={4}
          required
        />
        <ImageUpload
          label="Strategies Image"
          name="strategiesImage"
          value={strategiesImage}
          onChange={onImageChange}
          required
          colorScheme="yellow"
        />

        {/* Conclusion */}
        <TextAreaField
          label="Conclusion"
          name="conclusion"
          value={conclusion}
          onChange={onChange}
          rows={3}
          required
        />
        <ImageUpload
          label="Conclusion Image"
          name="conclusionImage"
          value={conclusionImage}
          onChange={onImageChange}
          required
          colorScheme="purple"
        />
      </div>
    </details>
  );
}