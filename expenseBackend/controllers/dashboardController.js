import incomeModel from "../models/Income.js";
import expenseModel from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";

// Dashboard Data
export const getDashboradData = async (req, res) => {
    try {
        const userId = req.user.id
        const userObjectId = new Types.ObjectId(String(userId))

        // Fetch total income & expense
        const totalIncome = await incomeModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        console.log('TotalIncome', { totalIncome, userId: isValidObjectId(userId) })

        const totalExpense = await expenseModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Get income transaction in the last 60 days
        const last60DaysIncomeTransactions = await incomeModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 })

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transaction in the last 30 days
        const last30DaysExpenseTransaction = await expenseModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 69 * 1000) }
        }).sort({ date: -1 })

        // Get total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        // Fetch last 5 transaction (income + expense)
        const lastTransaction = [
            ...(await incomeModel.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: 'income'
                })
            ),
            ...(await expenseModel.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: 'expense'
                })
            )
        ].sort((a, b) => b.date - a.date); // Sort latest first

        // Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransactions
            },
            recentTransaction: lastTransaction
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}