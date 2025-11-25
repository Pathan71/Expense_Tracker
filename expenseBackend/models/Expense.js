import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    icon: { type: String },
    category: { type: String, required: true }, // Example: Food, Rent, Groceries
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true })

const expenseModel = mongoose.models.user || mongoose.model('expenses', expenseSchema)

export default expenseModel;