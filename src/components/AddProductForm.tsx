'use client';

import ProgramBasicInfo from '@/app/dashboard/components/ProgramBasicInfo';
import ProgramDetailContent from '@/app/dashboard/components/ProgramDetailContent';
import PricingPlanForm from '@/app/dashboard/components/PricingPlanForm';
import PricingPlanList from '@/app/dashboard/components/PricingPlanList';
import FormAlert from '@/app/dashboard/components/FormAlert';
import useProductForm from '@/hooks/useProductForm';

interface Program {
  id: number;
  name: string;
  short_description: string;
  main_image_url: string;
  intro_description: string;
  main_content_image_url: string;
  what_causes: string;
  what_causes_image_url: string;
  health_risks: string;
  health_risks_image_url: string;
  strategies: string;
  strategies_image_url: string;
  conclusion: string;
  conclusion_image_url: string;
  created_at: string;
}

interface AddProductFormProps {
  editProgram?: Program;
}

export default function AddProductForm({ editProgram }: AddProductFormProps) {
  const {
    formData,
    isLoading,
    success,
    error,
    isEditMode,
    handleChange,
    handleFileChange,
    addPricingPlan,
    editPricingPlan,
    deletePricingPlan,
    handleSubmit
  } = useProductForm({
    programId: editProgram?.id,
    initialProgram: editProgram
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isEditMode ? 'Edit Healing Program' : 'Add New Healing Program'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {isEditMode ? 'Update program details and pricing plans' : 'Add program details and its pricing plans'}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Display Info */}
          <ProgramBasicInfo
            name={formData.name}
            shortDescription={formData.shortDescription}
            mainImage={formData.mainImage}
            onNameChange={handleChange}
            onDescriptionChange={handleChange}
            onImageChange={handleFileChange}
          />

          {/* Detail Page Content */}
          <ProgramDetailContent
            programName={formData.name}
            introDescription={formData.introDescription}
            mainContentImage={formData.mainContentImage}
            whatCauses={formData.whatCauses}
            whatCausesImage={formData.whatCausesImage}
            healthRisks={formData.healthRisks}
            healthRisksImage={formData.healthRisksImage}
            strategies={formData.strategies}
            strategiesImage={formData.strategiesImage}
            conclusion={formData.conclusion}
            conclusionImage={formData.conclusionImage}
            onChange={handleChange}
            onImageChange={handleFileChange}
          />

          {/* Pricing Plans Section */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Pricing Plans for {formData.name || 'this program'}</h4>
            
            <PricingPlanForm
              programName={formData.name}
              onAddPlan={addPricingPlan}
            />

            <div className="mt-4">
              <PricingPlanList
                plans={formData.pricingPlans}
                onEdit={editPricingPlan}
                onDelete={deletePricingPlan}
              />
            </div>
          </div>

          {isEditMode && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-yellow-900 mb-1">Edit Mode</h4>
                  <p className="text-sm text-yellow-700">
                    Images are optional. Only upload new images if you want to replace the existing ones.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && <FormAlert type="error" message={error} />}
          {success && <FormAlert type="success" message={success} />}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
          >
            {isLoading 
              ? (isEditMode ? 'Updating Program...' : 'Adding Program...') 
              : (isEditMode ? 'Update Program' : 'Add Complete Program')
            }
          </button>
        </form>
      </div>
    </div>
  );
}