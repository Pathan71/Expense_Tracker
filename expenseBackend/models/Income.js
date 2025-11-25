import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    icon: { type: String },
    source: { type: String, required: true }, // Example: Salary, Freelance etc.
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestampes: true })

const incomeModel = mongoose.models.user || mongoose.model('incomes', incomeSchema)

export default incomeModel;