import { bc } from '../helpers/bc.js';
import config from '../helpers/config.js';
import { cr } from '../helpers/cr.js';
import Report from '../models/report.js';
import mongoose from 'mongoose';


export const index = async (req, res) => {
    try {
        const period = req.query.period || 'year'
        let query = Report.find({ user: req.userId, period })

        if (req.query.year && req.query.month) {
            const { start, end } = bc.getYMSE(req.query.year, req.query.month)
            query.and({ date: { $gte: start, $lte: end } });
        } else if (req.query.year) {
            const { start, end } = bc.getYMSE(req.query.year)
            query.and({ date: { $gte: start, $lte: end } });
        }

        if (req.query.account) {
            query.and({ account: req.query.account })
        }

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        query.sort({ date: 'desc' })

        const data = await query
            .populate('reportable')
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const total = await Report.countDocuments(query.getFilter())

        const result = {
            data,
            current_page: page,
            last_page: Math.ceil(total / limit),
            per_page: limit,
            total
        };

        res.json(result);

    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const show = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const report = await Report.findOne({ _id: id }).populate('user')

        if (!report) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(report);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const store = async (req, res) => {

    let startDate = null
    let endDate = null
    let period = ""
    let reportable = null
    let reportableType = null
    let price = 0
    let accounts = []
    const { ObjectId } = mongoose.Types;


    try {
        if (req.body.year && req.body.month) {
            period = "month"
            const theDate = bc.getYMSE(req.body.year, req.body.month);
            console.log(theDate);
            startDate = theDate.start
            endDate = theDate.end
        } else if (req.body.year) {
            period = "year"
            const theDate = bc.getYMSE(req.body.year);
            startDate = theDate.start
            endDate = theDate.end
        } else {
            console.log("going to calc till report");

            period = "till"
            startDate = config.appStartDate
            endDate = bc.getToday()
        }

        if (req.body.account) {
            reportable = req.body.account
            reportableType = "Account"
            accounts = [new ObjectId(req.body.account)]
        }

        if (req.body.category) {
            reportable = req.body.category
            reportableType = "Category"
            accounts = (await cr.getCatAccounts(req.body.category)).map(acc => new ObjectId(acc))
        }

        price = await cr.findTotalPrice(startDate, endDate, accounts);

        // save or update then respond
        let saved = null
        let report = null
        if (period == 'till') {
            report = await Report.findOne({
                period,
                reportable,
                reportableType,
                user: req.userId,
            })
        } else {
            report = await Report.findOne({
                period,
                date: startDate,
                reportable,
                reportableType,
                user: req.userId,
            })
        }

        if (report) {
            report.price = price
            report.updatedAt = new Date()
            saved = await report.save()
        } else {

            const newReport = new Report({
                period,
                date: startDate,
                price,
                reportable,
                reportableType,
                user: req.userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            saved = await newReport.save();
        }
        res.status(201).json(saved);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.toString());
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedReport = await Report.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedReport) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};

export const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(deletedReport);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};