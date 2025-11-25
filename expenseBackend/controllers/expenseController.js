import xlsx from 'xlsx'
import expenseModel from '../models/Expense.js'

// Add Expense Source
export const addExpense = async (req, res) => {
    const userId = req.user.id;
    try {

        const { icon, category, amount, date } = req.body;

        // Validation check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newExpense = new expenseModel({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })
        await newExpense.save();
        res.status(200).json(newExpense)
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}

// Get All Expense Source
export const getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await expenseModel.find({ userId }).sort({ date: -1 })
        res.json(expense)
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

// Delete Expense Source
export const deleteExpense = async (req, res) => { 
    try {
        await expenseModel.findByIdAndDelete(req.params.id)
        res.json({message: "Expense deleted successfully"})
    } 
    catch (err) {
        res.status(500).json({message: 'Server Error'})
    }
}

// Download Excel
export const downloadExpenseExcel = async (req, res) => { 
    const userId = req.user.id
    try {
        const expense = await expenseModel.find({userId}).sort({date: -1})

        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Data: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'expenses')
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')
    } 
    catch (err) {
        res.status(500).json({message: 'Server Error'})
    }
}