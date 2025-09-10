import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import api from '../services/api'

const AddTransaction = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

 const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      await api.post('/transactions', formData)  // Change to api.post
      navigate('/')
    } catch (error) {
      console.error('Error adding transaction:', error)
      alert('Error adding transaction. Please make sure the backend server is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div>
      <TransactionForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">Saving...</div>
        </div>
      )}
    </div>
  )
}

export default AddTransaction