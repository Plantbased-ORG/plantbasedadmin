'use client';

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
}

interface PricingPlanListProps {
  plans: PricingPlan[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function PricingPlanList({ plans, onEdit, onDelete }: PricingPlanListProps) {
  if (plans.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Added Plans ({plans.length}):</p>
      {plans.map((plan, index) => (
        <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <div>
            <span className="font-medium">{plan.name}</span> - ₦{plan.price}
            <p className="text-xs text-gray-600">{plan.subtitle}</p>
            <p className="text-xs text-gray-500 mt-1">{plan.features.length} features</p>
          </div>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={() => onEdit(index)} 
              className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded text-sm font-medium transition"
            >
              Edit
            </button>
            <button 
              type="button" 
              onClick={() => onDelete(index)} 
              className="px-3 py-1 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}