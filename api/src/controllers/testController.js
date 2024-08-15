import Entry from '../models/entry.js';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const test = async (req, res) => {
    try {
        
        const result = await Entry.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date('2024-08-01'),
                        $lte: new Date('2024-08-31')
                    },
                    account: { $in: [ObjectId('66790936092ebe4314f226bd')] }

                }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: 1
                }
            }
        ]);

        const totalPrice = result[0] ? result[0].totalPrice : 0;
        console.log(result);
        // return totalPrice;
        res.json(result);

    } catch (error) {
        res.status(500).send(error.toString());
    }
};