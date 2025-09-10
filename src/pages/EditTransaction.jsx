import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import axios from 'axios'
import api from '../services/api'  // Change from axios to api


const EditTransaction = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransaction()
  }, [id])

 const fetchTransaction = async () => {
    try {
      const response = await api.get(`/transactions/${id}`)  // Change to api.get
      setTransaction(response.data)
    } catch (error) {
      console.error('Error fetching transaction:', error)
      alert('Error loading transaction. Please make sure the backend server is running on port 5000.')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }


  const handleSubmit = async (formData) => {
    try {
      await api.put(`/transactions/${id}`, formData)  // Change to api.put
      navigate('/')
    } catch (error) {
      console.error('Error updating transaction:', error)
      alert('Error updating transaction. Please try again.')
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        Loading...
      </div>
    )
  }

  return (
    <TransactionForm 
      transaction={transaction}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}

export default EditTransaction