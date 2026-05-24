import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const EMISSION_FACTORS = {
  electricity: 0.5,
  material: 0.3,
  transport: 0.2,
  waste: 0.4,
};

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.activity.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: '삭제 완료',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: '삭제 실패',
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { productName, activityType, amount, unit } = body;

    const emission =
      amount * EMISSION_FACTORS[activityType as keyof typeof EMISSION_FACTORS];

    const updatedActivity = await prisma.activity.update({
      where: {
        id,
      },
      data: {
        productName,
        activityType,
        amount,
        unit,
        emission,
      },
    });

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: '수정 실패',
      },
      {
        status: 500,
      },
    );
  }
}
