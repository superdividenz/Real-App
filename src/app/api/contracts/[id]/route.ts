import { NextRequest, NextResponse } from 'next/server'
import { contracts } from '@/lib/temp-storage'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const contract = contracts.find(c => c.id === id)

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    const contractWithSignatures = {
      ...contract,
      signatures: contract.signatures || [],
      signedBy: null,
    }

    return NextResponse.json(contractWithSignatures)
  } catch (error) {
    console.error('Error fetching contract:', error)
    return NextResponse.json({ error: 'Failed to fetch contract' }, { status: 500 })
  }
}