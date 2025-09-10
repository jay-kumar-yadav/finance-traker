import { useState, useEffect } from 'react'
import TransactionList from '../components/TransactionList'
import TransactionChart from '../components/TransactionChart'
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
      // First fetch transactions, then calculate stats from them
      await fetchTransactions()
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions')
      
      // Handle different response formats
      let transactionsData = [];
      
      if (Array.isArray(response.data)) {
        transactionsData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data.transactions)) {
        transactionsData = response.data.data.transactions;
      } else if (response.data.transactions && Array.isArray(response.data.transactions)) {
        transactionsData = response.data.transactions;
      }
      
      console.log('Fetched transactions:', transactionsData);
      setTransactions(transactionsData);
      
      // Calculate stats from the transactions
      calculateStats(transactionsData);
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setTransactions([])
      setStats({ income: 0, expense: 0, balance: 0 })
    }
  }

  const calculateStats = (transactions) => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      
    const balance = income - expense;
    
    console.log('Calculated stats:', { income, expense, balance });
    setStats({ income, expense, balance });
  }

  const fetchStats = async () => {
    try {
      const response = await api.get('/transactions/stats')
      
      // Handle different response formats
      let income = 0;
      let expense = 0;
      let balance = 0;
      
      if (response.data.income !== undefined && response.data.expense !== undefined) {
        income = response.data.income || 0;
        expense = response.data.expense || 0;
        balance = response.data.balance || income - expense;
      } else if (response.data.data) {
        income = response.data.data.income || 0;
        expense = response.data.data.expense || 0;
        balance = response.data.data.balance || income - expense;
      } else {
        // If stats API doesn't work, calculate from transactions
        calculateStats(transactions);
        return;
      }
      
      console.log('Fetched stats:', { income, expense, balance });
      setStats({ income, expense, balance });
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Calculate stats from transactions if API fails
      calculateStats(transactions);
    }
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
          <p className="text-3xl font-bold text-green-600">₹{stats.income.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">₹{stats.expense.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Balance</h3>
          <p className={`text-3xl font-bold ${
            stats.balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ₹{stats.balance.toFixed(2)}
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