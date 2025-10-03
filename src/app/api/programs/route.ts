import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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
    const formData = await request.formData();
    
    // Extract text fields
    const name = formData.get('name') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const introDescription = formData.get('introDescription') as string;
    const whatCauses = formData.get('whatCauses') as string;
    const healthRisks = formData.get('healthRisks') as string;
    const strategies = formData.get('strategies') as string;
    const conclusion = formData.get('conclusion') as string;
    const pricingPlansStr = formData.get('pricingPlans') as string;
    
    // Extract image files
    const mainImageFile = formData.get('mainImage') as File;
    const mainContentImageFile = formData.get('mainContentImage') as File;
    const whatCausesImageFile = formData.get('whatCausesImage') as File;
    const healthRisksImageFile = formData.get('healthRisksImage') as File;
    const strategiesImageFile = formData.get('strategiesImage') as File;
    const conclusionImageFile = formData.get('conclusionImage') as File;

    // Validate required fields
    if (!name || !shortDescription || !introDescription || !whatCauses || !healthRisks || !strategies || !conclusion) {
      return NextResponse.json(
        { error: 'All text fields are required' },
        { status: 400 }
      );
    }

    if (!mainImageFile || !mainContentImageFile || !whatCausesImageFile || !healthRisksImageFile || !strategiesImageFile || !conclusionImageFile) {
      return NextResponse.json(
        { error: 'All images are required' },
        { status: 400 }
      );
    }

    const pricingPlans = JSON.parse(pricingPlansStr);
    if (!pricingPlans || pricingPlans.length === 0) {
      return NextResponse.json(
        { error: 'At least one pricing plan is required' },
        { status: 400 }
      );
    }

    // Function to save file and return path
    const saveFile = async (file: File, prefix: string) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/\s+/g, '-');
      const filename = `${prefix}-${timestamp}-${originalName}`;
      
      // Save to public/uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      
      // Return the public URL path
      return `/uploads/${filename}`;
    };

    // Save all images
    const mainImage = await saveFile(mainImageFile, 'card');
    const mainContentImage = await saveFile(mainContentImageFile, 'intro');
    const whatCausesImage = await saveFile(whatCausesImageFile, 'causes');
    const healthRisksImage = await saveFile(healthRisksImageFile, 'risks');
    const strategiesImage = await saveFile(strategiesImageFile, 'strategies');
    const conclusionImage = await saveFile(conclusionImageFile, 'conclusion');

    const newProgram: Program = {
      id: Date.now().toString(),
      name,
      shortDescription,
      mainImage,
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
      pricingPlans,
      createdAt: new Date().toISOString()
    };

    programs.push(newProgram);

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    console.error('Error saving program:', error);
    return NextResponse.json(
      { error: 'Failed to add program' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};