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
    const { signature } = await request.json()

    const contractIndex = contracts.findIndex(c => c.id === id)

    if (contractIndex === -1) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    // Update contract status to signed
    contracts[contractIndex] = {
      ...contracts[contractIndex],
      status: 'signed',
      signedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      signatures: [{
        id: Date.now().toString(),
        data: signature,
        signedAt: new Date().toISOString(),
      }],
    }

    return NextResponse.json({ message: 'Contract signed successfully' })
  } catch (error) {
    console.error('Error signing contract:', error)
    return NextResponse.json({ error: 'Failed to sign contract' }, { status: 500 })
  }
}

    return NextResponse.json({ success: true, contract })
  } catch (error) {
    console.error('Error signing contract:', error)
    return NextResponse.json({ error: 'Failed to sign contract' }, { status: 500 })
  }
}