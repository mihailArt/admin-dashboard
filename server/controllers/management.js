import mongoose from 'mongoose'
import User from '../models/User.js'
import Transaction from '../models/Transaction.js'

export const getAdmins = async (req, res) => {
	try {
		const admins = await User.find({ role: 'admin' }).select('-password')
		res.status(200).json(admins)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getUserPerformance = async (req, res) => {
	try {
		const { id } = req.params

		const userWithStats = await User.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: 'affiliatestats',
					localField: '_id',
					foreignField: 'userId',
					pipeline: [
						{
							$lookup: {
								from: 'transactions',
								localField: 'affiliateSales',
								foreignField: '_id',
								as: 'userTransactions',
							},
						},
					],
					as: 'affiliateStats',
				},
			},
			{
				$unwind: '$affiliateStats',
			},
		])

		res.status(200).json(userWithStats[0].affiliateStats.userTransactions)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
