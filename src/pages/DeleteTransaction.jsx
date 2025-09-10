import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import api from '../services/api'  // Change from axios to api


const DeleteTransaction = () => {
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


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

   const handleDelete = async () => {
    try {
      await api.delete(`/transactions/${id}`)  // Change to api.delete
      navigate('/')
    } catch (error) {
      console.error('Error deleting transaction:', error)
      alert('Error deleting transaction. Please try again.')
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
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Delete Transaction</h2>
      
      <div className="mb-6 p-4 bg-red-50 rounded-lg">
        <p className="text-red-800 font-semibold text-center">
          Are you sure you want to delete this transaction?
        </p>
      </div>
      
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{transaction.title}</h3>
        <p className={`text-lg font-bold ${
          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
        <p className="text-gray-600">Category: {transaction.category}</p>
        <p className="text-gray-600">
          Date: {new Date(transaction.date).toLocaleDateString('en-IN')}
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteTransaction