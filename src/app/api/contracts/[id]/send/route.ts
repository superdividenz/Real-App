import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { clientEmail } = await request.json()

    // Find the contract
    const contract = await prisma.contract.findUnique({
      where: { id },
      include: { createdBy: true }
    })

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    // Find or create the client user
    let client = await prisma.user.findUnique({
      where: { email: clientEmail }
    })

    if (!client) {
      client = await prisma.user.create({
        data: {
          email: clientEmail,
          name: clientEmail.split('@')[0],
          role: 'client'
        }
      })
    }

    // Update contract status to sent
    const updatedContract = await prisma.contract.update({
      where: { id },
      data: {
        status: 'sent',
        sentAt: new Date(),
        signedById: client.id,
      },
      include: {
        createdBy: true,
        signedBy: true
      }
    })

    // In a real app, send email here
    console.log(`Contract ${contract.id} sent to ${clientEmail}`)

    return NextResponse.json({ success: true, contract: updatedContract })
  } catch (error) {
    console.error('Error sending contract:', error)
    return NextResponse.json({ error: 'Failed to send contract' }, { status: 500 })
  }
}