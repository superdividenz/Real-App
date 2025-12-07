'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SignatureCanvas from 'react-signature-canvas'

interface Contract {
  id: string
  title: string
  content: string
  status: string
}

export default function SignContractPage() {
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(false)
  const [signing, setSigning] = useState(false)
  const sigCanvasRef = useRef<SignatureCanvas>(null)
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
          alert('Contract not found or not available for signing')
          router.push('/')
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

  const handleSign = async () => {
    if (!contract || !sigCanvasRef.current) return

    const signatureData = sigCanvasRef.current.toDataURL()

    setSigning(true)
    try {
      const response = await fetch(`/api/contracts/${id}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature: signatureData,
        }),
      })

      if (response.ok) {
        alert('Contract signed successfully!')
        router.push('/')
      } else {
        alert('Error signing contract')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error signing contract')
    } finally {
      setSigning(false)
    }
  }

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear()
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">Loading...</div>
  }

  if (!contract) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">Contract not found</div>
  }

  if (contract.status === 'signed') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <p>This contract has already been signed.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sign Contract: {contract.title}</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contract Content</h2>
          <div className="bg-gray-50 p-4 rounded border whitespace-pre-wrap max-h-96 overflow-y-auto">
            {contract.content}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Signature</h2>
          <p className="text-sm text-gray-600 mb-4">
            Please sign below using your mouse or touch device.
          </p>

          <div className="border-2 border-gray-300 rounded mb-4">
            <SignatureCanvas
              ref={sigCanvasRef}
              canvasProps={{
                width: 500,
                height: 200,
                className: 'signature-canvas',
              }}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSign}
              disabled={signing}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {signing ? 'Signing...' : 'Sign Contract'}
            </button>
            <button
              onClick={clearSignature}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Clear Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}