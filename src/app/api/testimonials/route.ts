import { NextResponse } from 'next/server';

// This is a mock in-memory store. Replace with your actual database later
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Los Angeles, CA',
    review: 'Amazing products! I love the quality and taste. Highly recommend to everyone looking for healthy plant-based options.',
    avatar: ''
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    review: 'Best decision I ever made switching to these products. My energy levels have never been better!',
    avatar: ''
  }
];

// GET: Fetch all testimonials
export async function GET() {
  return NextResponse.json(testimonials);
}

// POST: Add new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.location || !body.review) {
      return NextResponse.json(
        { error: 'Name, location, and review are required' },
        { status: 400 }
      );
    }

    // Create new testimonial
    const newTestimonial = {
      id: Date.now().toString(),
      name: body.name,
      location: body.location,
      review: body.review,
      avatar: body.avatar || ''
    };

    testimonials.push(newTestimonial);

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to add testimonial' },
      { status: 500 }
    );
  }
}