import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const EMISSION_FACTORS = {
  electricity: 0.5,
  material: 0.3,
  transport: 0.2,
  waste: 0.4,
};

export async function GET() {
  const activities = await prisma.activity.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(activities);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { activityDate, productName, activityType, amount, unit } = body;

  const emission =
    amount * EMISSION_FACTORS[activityType as keyof typeof EMISSION_FACTORS];

  const activity = await prisma.activity.create({
    data: {
      activityDate,
      productName,
      activityType,
      amount,
      unit,
      emission,
    },
  });

  return NextResponse.json(activity);
}
