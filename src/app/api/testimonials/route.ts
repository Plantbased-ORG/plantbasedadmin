import { NextResponse } from 'next/server';

interface ProductSection {
  title: string;
  content: string;
  image?: string;
}

interface Program {
  id: string;
  name: string;
  shortDescription: string;
  mainImage: string;
  fullDescription: string;
  sections: ProductSection[];
  createdAt: string;
}

const programs: Program[] = [
  {
    id: '1',
    name: 'Obesity',
    shortDescription: 'Obesity has become a global health concern, affecting millions of people across all age groups. It is a complex...',
    mainImage: '/obesity.jpg',
    fullDescription: 'Obesity has become a global health concern, affecting millions of people across all age groups. It is a complex condition influenced by genetic, behavioral, and environmental factors. While many people associate obesity with aesthetics, its impact on overall health is far more significant.',
    sections: [
      {
        title: 'What Causes Obesity?',
        content: 'Obesity occurs when excess fat accumulates in the body due to an imbalance between calorie intake and energy expenditure. Several factors contribute to this condition:\n1. Poor Diet Choices - High consumption of processed foods, sugary drinks, and unhealthy fats can lead to excessive weight gain.\n2. Sedentary Lifestyle - A lack of physical activity prevents the body from burning excess calories, leading to fat accumulation.\n3. Genetics - Family history and genetics can make some individuals more prone to obesity than others.\n4. Hormonal Imbalances - Conditions such as hypothyroidism and polycystic ovary syndrome (PCOS) can contribute to weight gain.\n5. Psychological Factors - Stress, anxiety, and depression often lead to emotional eating and unhealthy food choices.',
        image: '/obesity-causes.jpg'
      },
      {
        title: 'Health Risks Associated with Obesity',
        content: 'Obesity significantly increases the risk of various health conditions, including:\n• Type 2 Diabetes - Excess body fat affects insulin regulation, leading to diabetes.\n• Heart Disease - Obesity contributes to high blood pressure, high cholesterol, and an increased risk of heart attacks.\n• Joint Problems - Extra weight puts stress on joints, leading to conditions such as osteoarthritis.\n• Respiratory Issues - Obesity can cause sleep apnea and breathing difficulties.\n• Mental Health Issues - Individuals with obesity often experience low self-esteem, depression, and social stigma.',
        image: '/obesity-risks.jpg'
      }
    ],
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(programs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.shortDescription || !body.mainImage || !body.fullDescription) {
      return NextResponse.json(
        { error: 'Name, short description, main image, and full description are required' },
        { status: 400 }
      );
    }

    const newProgram: Program = {
      id: Date.now().toString(),
      name: body.name,
      shortDescription: body.shortDescription,
      mainImage: body.mainImage,
      fullDescription: body.fullDescription,
      sections: body.sections || [],
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