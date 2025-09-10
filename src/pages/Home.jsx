import { useState, useEffect } from 'react'
import TransactionList from '../components/TransactionList'
import TransactionChart from '../components/TransactionChart'
import axios from 'axios'
import api from '../services/api' 


const Home = () => {
  const [transactions, setTransactions] = useState([])
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  })
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      await Promise.all([fetchTransactions(), fetchStats()])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions')  // Change to api.get
      // Make sure we have an array, even if empty
      setTransactions(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setTransactions([]) // Set to empty array on error
    }
  }

  const fetchStats = async () => {
    try {
      const response = await api.get('/transactions/stats')  // Change to api.get
      // The response.data is now an object, not an array
      setStats({
        income: response.data.income || 0,
        expense: response.data.expense || 0,
        balance: response.data.balance || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
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

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const handleRefresh = () => {
    fetchData()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.income)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(stats.expense)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Balance</h3>
          <p className={`text-3xl font-bold ${
            stats.balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(stats.balance)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList 
            transactions={transactions}
            filters={filters}
            onFilterChange={handleFilterChange}
            onRefresh={handleRefresh}
          />
        </div>
        
        <div>
          <TransactionChart transactions={transactions} />
        </div>
      </div>
    </div>
  )
}

export default Home