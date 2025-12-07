import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { title, content, createdById } = await request.json()

    const contract = await prisma.contract.create({
      data: {
        title,
        content,
        createdById,
      },
    })

    return NextResponse.json(contract, { status: 201 })
  } catch (error) {
    console.error('Error creating contract:', error)
    return NextResponse.json({ error: 'Failed to create contract' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        createdBy: true,
        signedBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(contracts)
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json({ error: 'Failed to fetch contracts' }, { status: 500 })
  }
}