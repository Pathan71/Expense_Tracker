import xlsx from 'xlsx'
import incomeModel from '../models/Income.js'

// Add Income Source
export const addIncome = async (req, res) => {
    const userId = req.user.id;
    try {

        const { icon, source, amount, date } = req.body;

        // Validation check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newIncome = new incomeModel({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save();
        res.status(200).json(newIncome)
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}

// Get All Income Source
export const getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await incomeModel.find({ userId }).sort({ date: -1 })
        res.json(income)
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

// Delete Income Source
export const deleteIncome = async (req, res) => { 
    try {
        await incomeModel.findByIdAndDelete(req.params.id)
        res.json({message: "Income deleted successfully"})
    }
    catch (err) {
        res.status(500).json({message: 'Server Error'})
    }
}

// Download Excel
export const downloadIncomeExcel = async (req, res) => { 
    const userId = req.user.id
    try {
        const income = await incomeModel.find({userId}).sort({date: -1})

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Data: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'incomes')
        xlsx.writeFile(wb, 'income_details.xlsx')
        res.download('income_details.xlsx')
    } 
    catch (err) {
        res.status(500).json({message: 'Server Error'})
    }
}