import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { prepareExpeseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpeseLineChartData(transactions);
        setChartData(result);

        return () => {}
    }, [transactions])

  return (
    <div className='bg-white p-6 mt-5 rounded-2xl shadow-md shadow-gray-100 border-gray-200/50'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your spending trends over time and again insights into where your money goes.
                </p>
            </div>

            <button className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer' 
            onClick={onExpenseIncome}
            >
                <Plus className='text-lg' /> Add Expense
            </button>
        </div>

        <div className='mt-10'>
            <CustomLineChart data={chartData} />
        </div>
    </div>
  )
}

export default ExpenseOverview