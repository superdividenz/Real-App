import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { signature } = await request.json()

    // Update contract status to signed
    const contract = await prisma.contract.update({
      where: { id: params.id },
      data: {
        status: 'signed',
        signedAt: new Date(),
      },
    })

    // Create signature record
    await prisma.signature.create({
      data: {
        contractId: params.id,
        data: signature,
      },
    })

    return NextResponse.json({ success: true, contract })
  } catch (error) {
    console.error('Error signing contract:', error)
    return NextResponse.json({ error: 'Failed to sign contract' }, { status: 500 })
  }
}