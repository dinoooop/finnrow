import Account from '../models/account.js';

export const index = async (req, res) => {
    try {
        const data = await Account.find();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const show = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const account = await Account.findOne({ _id: id }).populate('user')

        if (!account) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(account);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const store = async (req, res) => {

    const file = req.file;

    try {
        const newAccount = new Account({
            user: req.userId,
            name: req.body.name,
            description: req.body.description
        });

        const savedAccount = await newAccount.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.toString());
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedAccount) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(updatedAccount);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};

export const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(deletedAccount);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};