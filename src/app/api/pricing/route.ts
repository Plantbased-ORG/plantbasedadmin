import { NextResponse } from 'next/server';

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  createdAt: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Basic',
    subtitle: 'Your foundation for a healthier life!',
    price: '500,000.00',
    features: [
      'Full body scan',
      'Personalized meal plans',
      'Coaching and lifestyle guidance',
      'Detox and body cleansing strategies',
      'Exclusive health and wellness resources'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Premium',
    subtitle: 'Upgrade to an elite level of health!',
    price: '1,200,000.00',
    features: [
      'Basic Package',
      'Advanced metabolic reprogramming',
      'Private coaching sessions',
      'Stress and lifestyle optimization',
      'Supplement recommendations'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Executive',
    subtitle: 'The Ultimate Health Transformation',
    price: '6,000,000.00',
    features: [
      'Premium Package',
      '24/7 access to health experts',
      'Full-body detox and electrification',
      'Luxury wellness retreat and spa',
      'Holistic therapy sessions',
      'Personalized workouts',
      'Lifetime access to health materials'
    ],
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(pricingPlans);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.subtitle || !body.price || !body.features || body.features.length === 0) {
      return NextResponse.json(
        { error: 'Name, subtitle, price, and at least one feature are required' },
        { status: 400 }
      );
    }

    const newPlan: PricingPlan = {
      id: Date.now().toString(),
      name: body.name,
      subtitle: body.subtitle,
      price: body.price,
      features: body.features,
      createdAt: new Date().toISOString()
    };

    pricingPlans.push(newPlan);

    return NextResponse.json(newPlan, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to add pricing plan' },
      { status: 500 }
    );
  }
}