'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Contract {
  id: string
  title: string
  status: string
}

export default function SendContractPage() {
  const [contract, setContract] = useState<Contract | null>(null)
  const [clientEmail, setClientEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    async function fetchContract() {
      setLoading(true)
      try {
        const response = await fetch(`/api/contracts/${id}`)
        if (response.ok) {
          const data = await response.json()
          setContract(data)
        } else {
          alert('Contract not found')
          router.push('/contracts')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error fetching contract')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchContract()
    }
  }, [id, router])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract || contract.status !== 'draft') return

    setSending(true)
    try {
      // For now, just update status to sent
      const response = await fetch(`/api/contracts/${id}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientEmail,
        }),
      })

      if (response.ok) {
        alert('Contract sent successfully!')
        router.push('/contracts')
      } else {
        alert('Error sending contract')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error sending contract')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">Loading...</div>
  }

  if (!contract) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">Contract not found</div>
  }

  if (contract.status !== 'draft') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p>This contract has already been sent.</p>
            <button
              onClick={() => router.push('/contracts')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Contracts
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Send Contract: {contract.title}</h1>

        <form onSubmit={handleSend} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Client Email Address
            </label>
            <input
              type="email"
              id="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="client@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              The client will receive a link to sign this contract. The signing link will be:
            </p>
            <code className="block mt-2 p-2 bg-gray-100 rounded text-sm">
              {typeof window !== 'undefined' ? `${window.location.origin}/sign/${contract.id}` : `/sign/${contract.id}`}
            </code>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={sending}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Contract'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}