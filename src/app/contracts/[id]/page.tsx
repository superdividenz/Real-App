import { notFound } from 'next/navigation'
import Link from 'next/link'
// import { prisma } from '@/lib/prisma'

interface ContractPageProps {
  params: Promise<{
    id: string
  }>
}

async function getContract(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/contracts/${id}`, {
      cache: 'no-store'
    })
    if (response.ok) {
      return await response.json()
    }
    return null
  } catch (error) {
    console.error('Error fetching contract:', error)
    return null
  }
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { id } = await params
  const contract = await getContract(id)

  if (!contract) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{contract.title}</h1>
          <div className="flex gap-4">
            <Link
              href="/contracts"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back to Contracts
            </Link>
            {contract.status === 'draft' && (
              <Link
                href={`/contracts/${contract.id}/send`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send to Client
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-semibold">Status:</span>
              <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                contract.status === 'signed'
                  ? 'bg-green-100 text-green-800'
                  : contract.status === 'sent'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {contract.status}
              </span>
            </div>
            <div>
              <span className="font-semibold">Created:</span>
              <span className="ml-2">{new Date(contract.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="font-semibold">Created By:</span>
              <span className="ml-2">{contract.createdBy.name || contract.createdBy.email}</span>
            </div>
            {contract.signedBy && (
              <div>
                <span className="font-semibold">Signed By:</span>
                <span className="ml-2">{contract.signedBy.name || contract.signedBy.email}</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contract Content</h2>
            <div className="bg-gray-50 p-4 rounded border whitespace-pre-wrap">
              {contract.content}
            </div>
          </div>
        </div>

        {contract.signatures.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Signatures</h2>
            <div className="space-y-4">
              {contract.signatures.map((signature) => (
                <div key={signature.id} className="border rounded p-4">
                  <p className="text-sm text-gray-600">
                    Signed on {new Date(signature.signedAt).toLocaleDateString()} at {new Date(signature.signedAt).toLocaleTimeString()}
                  </p>
                  <img
                    src={signature.data}
                    alt="Signature"
                    className="mt-2 max-w-xs border"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}