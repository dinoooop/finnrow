import Entry from '../models/entry.js';
import Category from '../models/category.js';

// project core functions
export class cr {

    static async findTotalPrice(startDate, endDate, accounts = []) {
        
        try {
            const result = await Entry.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        },
                        account: { $in: accounts }
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
            return totalPrice;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async getCatAccounts(id) {
        const category = await Category.findOne({ _id: id });
        return category.accounts;
    }

}