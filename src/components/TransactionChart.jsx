import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import api from '../services/api'  // Change from axios to api

ChartJS.register(ArcElement, Tooltip, Legend)

const TransactionChart = ({ transactions }) => {
  const [hasError, setHasError] = useState(false)
  
  if (hasError) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
        <div className="h-64 flex items-center justify-center text-red-500">
          Error loading chart data
        </div>
      </div>
    )
  }
  
  try {
    // Make sure transactions is an array
    const safeTransactions = Array.isArray(transactions) ? transactions : []
    
    // Calculate totals by category
    const categoryTotals = safeTransactions.reduce((acc, transaction) => {
      const amount = transaction.type === 'income' 
        ? transaction.amount 
        : -transaction.amount
        
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0
      }
      acc[transaction.category] += amount
      return acc
    }, {})

    const data = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
          ]
        }
      ]
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
        <div className="h-64">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error rendering chart:', error)
    setHasError(true)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
        <div className="h-64 flex items-center justify-center text-red-500">
          Error loading chart data
        </div>
      </div>
    )
  }
}

export default TransactionChart