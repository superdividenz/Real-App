import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { clientEmail } = await request.json()

    // First, find or create the client user
    let client = await prisma.user.findUnique({
      where: { email: clientEmail },
    })

    if (!client) {
      client = await prisma.user.create({
        data: {
          email: clientEmail,
          role: 'client',
        },
      })
    }

    // Update contract status to sent
    const contract = await prisma.contract.update({
      where: { id: params.id },
      data: {
        status: 'sent',
        sentAt: new Date(),
        signedById: client.id,
      },
    })

    // In a real app, send email here
    console.log(`Contract ${contract.id} sent to ${clientEmail}`)

    return NextResponse.json({ success: true, contract })
  } catch (error) {
    console.error('Error sending contract:', error)
    return NextResponse.json({ error: 'Failed to send contract' }, { status: 500 })
  }
}