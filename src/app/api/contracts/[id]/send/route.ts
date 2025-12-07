import { NextRequest, NextResponse } from 'next/server'
import { contracts } from '@/lib/temp-storage'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { clientEmail } = await request.json()

    const contractIndex = contracts.findIndex(c => c.id === id)

    if (contractIndex === -1) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    // Update contract status to sent
    contracts[contractIndex] = {
      ...contracts[contractIndex],
      status: 'sent',
      sentAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ message: 'Contract sent successfully' })
  } catch (error) {
    console.error('Error sending contract:', error)
    return NextResponse.json({ error: 'Failed to send contract' }, { status: 500 })
  }
}
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