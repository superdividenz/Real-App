import { NextRequest, NextResponse } from 'next/server'
import { contracts } from '@/lib/temp-storage'

export async function POST(request: NextRequest) {
  try {
    const { title, content, createdById } = await request.json()

    const contract = {
      id: Date.now().toString(),
      title,
      content,
      createdById,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: {
        id: createdById,
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      }
    }

    contracts.push(contract)

    return NextResponse.json(contract, { status: 201 })
  } catch (error) {
    console.error('Error creating contract:', error)
    return NextResponse.json({ error: 'Failed to create contract' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const contractsWithRelations = contracts.map(contract => ({
      ...contract,
      signedBy: null,
    }))

    return NextResponse.json(contractsWithRelations)
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json({ error: 'Failed to fetch contracts' }, { status: 500 })
  }
}