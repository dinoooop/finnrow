import Qnote from '../models/qnote.js';

export const index = async (req, res) => {
    try {
        const data = await Qnote.find().populate('account');
        res.json(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const show = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const qnote = await Qnote.findOne({ _id: id }).populate('account')

        if (!qnote) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(qnote);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const store = async (req, res) => {

    const file = req.file;

    try {
        const newQnote = new Qnote({
            user: req.userId,
            note: req.body.note,
            account: req.body.account
        });

        const savedQnote = await newQnote.save();
        res.status(201).json(savedQnote);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.toString());
    }
};

export const update = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedQnote = await Qnote.findByIdAndUpdate(id, {
            note: req.body.note,
            account: req.body.account
        }, { new: true });
        if (!updatedQnote) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(updatedQnote);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};

export const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQnote = await Qnote.findByIdAndDelete(id);
        if (!deletedQnote) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(deletedQnote);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};
