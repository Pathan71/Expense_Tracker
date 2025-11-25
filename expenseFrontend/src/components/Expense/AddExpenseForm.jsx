import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense }) => {
    const [income, setIncome] = useState({
        category: '',
        amount: '',
        date: '',
        icon: ''
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={income.category}
                onChange={({ target }) => handleChange('category', target.value)}
                label='Category'
                placeholder='Rent, Groceries, etc'
                type='text'
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label='Amount'
                placeholder=''
                type='Number'
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label='Date'
                placeholder=''
                type='date'
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    onClick={() => onAddExpense(income)}
                    className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer text-white bg-violet-500'
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm