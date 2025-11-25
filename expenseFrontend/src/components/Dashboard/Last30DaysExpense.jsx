import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpense = ({data}) => {

    const [chartData, setChartData] = useState([])
    // console.log("ChartData for Last 30 Days:", chartData);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data)
        setChartData(result)

        return () => {}
    }, [data])

  return (
    <div className='bg-white p-6 mt-5 rounded-2xl shadow-md shadow-gray-100 border-gray-200/50 col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpense