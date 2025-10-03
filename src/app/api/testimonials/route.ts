import { NextResponse } from 'next/server';

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
  createdAt: string;
}

const programs: Program[] = [
  {
    id: '1',
    name: 'Obesity',
    shortDescription: 'Obesity has become a global health concern, affecting millions of people across all age groups. It is a complex...',
    mainImage: '/obesity-card.jpg',
    introDescription: 'Obesity has become a global health concern, affecting millions of people across all age groups. It is a complex condition influenced by genetic, behavioral, and environmental factors. While many people associate obesity with aesthetics, its impact on overall health is far more significant.',
    mainContentImage: '/obesity-main.jpg',
    whatCauses: 'Obesity occurs when excess fat accumulates in the body due to an imbalance between calorie intake and energy expenditure. Several factors contribute to this condition:\n\n1. Poor Diet Choices – High consumption of processed foods, sugary drinks, and unhealthy fats can lead to excessive weight gain.\n\n2. Sedentary Lifestyle – A lack of physical activity prevents the body from burning excess calories, leading to fat accumulation.\n\n3. Genetics – Family history and genetics can make some individuals more prone to obesity than others.\n\n4. Hormonal Imbalances – Conditions such as hypothyroidism and polycystic ovary syndrome (PCOS) can contribute to weight gain.\n\n5. Psychological Factors – Stress, anxiety, and depression often lead to emotional eating and unhealthy food choices.',
    whatCausesImage: '/obesity-causes.jpg',
    healthRisks: 'Obesity significantly increases the risk of various health conditions, including:\n\n• Type 2 Diabetes – Excess body fat affects insulin regulation, leading to diabetes.\n\n• Heart Disease – Obesity contributes to high blood pressure, high cholesterol, and an increased risk of heart attacks.\n\n• Joint Problems – Extra weight puts stress on joints, leading to conditions such as osteoarthritis.\n\n• Respiratory Issues – Obesity can cause sleep apnea and breathing difficulties.\n\n• Mental Health Issues – Individuals with obesity often experience low self-esteem, depression, and social stigma.',
    healthRisksImage: '/obesity-risks.jpg',
    strategies: 'Preventing and managing obesity requires a multifaceted approach:\n\n1. Adopting a Healthy Diet – Incorporating more whole foods, lean proteins, fruits, and vegetables while reducing processed foods.\n\n2. Increasing Physical Activity – Engaging in at least 150 minutes of moderate exercise per week can help maintain a healthy weight.\n\n3. Behavioral Changes – Practicing mindful eating, stress management, and self-discipline with food choices.\n\n4. Medical Interventions – In some cases, medication or bariatric surgery may be necessary for individuals struggling with severe obesity.\n\n5. Community Support and Education – Raising awareness about obesity and promoting a culture of health in schools and workplaces.',
    strategiesImage: '/obesity-strategies.jpg',
    conclusion: 'Obesity is a complex health issue that requires individual, societal, and medical interventions. By making conscious lifestyle changes and spreading awareness, we can reduce its prevalence and improve overall well being. Whether through dietary modifications, increased physical activity, or seeking medical advice, small steps can lead to significant health benefits.',
    conclusionImage: '/obesity-conclusion.jpg',
    createdAt: new Date().toISOString()
  }
];

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