import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#875CF5', '#FA2C37', '#FF6900']

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: 'Total Balance', amount: totalBalance },
        { name: 'Total Income', amount: totalIncome },
        { name: 'Total Expense', amount: totalExpense }
    ]

    return (
        <div className='bg-white p-6 mt-5 rounded-2xl shadow-md shadow-gray-100 border-gray-200/50'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label='Total Balance'
                totalAmount={`$${totalBalance}`}
                color={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview