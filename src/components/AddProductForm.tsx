'use client';

import ProgramBasicInfo from '@/app/dashboard/components/ProgramBasicInfo';
import ProgramDetailContent from '@/app/dashboard/components/ProgramDetailContent';
import PricingPlanForm from '@/app/dashboard/components/PricingPlanForm';
import PricingPlanList from '@/app/dashboard/components/PricingPlanList';
import FormAlert from '@/app/dashboard/components/FormAlert';
import useProductForm from '@/hooks/useProductForm';

export default function AddProductForm() {
  const {
    formData,
    isLoading,
    success,
    error,
    handleChange,
    handleFileChange,
    addPricingPlan,
    editPricingPlan,
    deletePricingPlan,
    handleSubmit
  } = useProductForm();

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Healing Program
        </h3>
        <p className="text-sm text-gray-500 mt-1">Add program details and its pricing plans</p>
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

          {error && <FormAlert type="error" message={error} />}
          {success && <FormAlert type="success" message={success} />}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Adding Program...' : 'Add Complete Program'}
          </button>
        </form>
      </div>
    </div>
  );
}