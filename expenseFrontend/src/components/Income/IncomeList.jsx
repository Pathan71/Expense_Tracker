import { Download } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete, onDowload }) => {
    
    return (
        <div className='bg-white p-6 mt-5 rounded-2xl shadow-md shadow-gray-100 border-gray-200/50'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income Source</h5>

                <button className='flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer'
                    onClick={onDowload}
                >
                    <Download className='text-base' /> Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((income) => (
                    <TransactionInfoCard
                    key={income._id}
                    title={income.source}
                    icon={income.icon}
                    date={moment(income.date).format('Do MMM YYYY')}
                    amount={income.amount}
                    type='income'
                    onDelete={() => onDelete(income._id)} />
                ))}
            </div>
        </div>
    )
}

export default IncomeList