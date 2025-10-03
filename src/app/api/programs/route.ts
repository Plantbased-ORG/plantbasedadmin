import { NextResponse } from 'next/server';

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
}

interface Program {
  id: string;
  name: string;
  shortDescription: string;
  mainImage: string;
  introDescription: string;
  mainContentImage: string;
  whatCauses: string;
  whatCausesImage: string;
  healthRisks: string;
  healthRisksImage: string;
  strategies: string;
  strategiesImage: string;
  conclusion: string;
  conclusionImage: string;
  pricingPlans: PricingPlan[];
  createdAt: string;
}

const programs: Program[] = [];

export async function GET() {
  return NextResponse.json(programs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const requiredFields = [
      'name', 'shortDescription', 'mainImage', 'introDescription', 
      'mainContentImage', 'whatCauses', 'whatCausesImage', 
      'healthRisks', 'healthRisksImage', 'strategies', 
      'strategiesImage', 'conclusion', 'conclusionImage'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!body.pricingPlans || body.pricingPlans.length === 0) {
      return NextResponse.json(
        { error: 'At least one pricing plan is required' },
        { status: 400 }
      );
    }

    const newProgram: Program = {
      id: Date.now().toString(),
      name: body.name,
      shortDescription: body.shortDescription,
      mainImage: body.mainImage,
      introDescription: body.introDescription,
      mainContentImage: body.mainContentImage,
      whatCauses: body.whatCauses,
      whatCausesImage: body.whatCausesImage,
      healthRisks: body.healthRisks,
      healthRisksImage: body.healthRisksImage,
      strategies: body.strategies,
      strategiesImage: body.strategiesImage,
      conclusion: body.conclusion,
      conclusionImage: body.conclusionImage,
      pricingPlans: body.pricingPlans,
      createdAt: new Date().toISOString()
    };

    programs.push(newProgram);

    return NextResponse.json(newProgram, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to add program' },
      { status: 500 }
    );
  }
}