import Category from '../models/category.js';

export const index = async (req, res) => {
    try {
        const data = await Category.find();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const show = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const category = await Category.findOne({ _id: id }).populate('user')

        if (!category) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const store = async (req, res) => {

    const file = req.file;

    try {

        const newCategory = new Category({
            user: req.userId,
            name: req.body.name,
            description: req.body.description,
            accounts: req.body.accounts
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.toString());
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, {
            name: req.body.name,
            description: req.body.description,
            accounts: req.body.accounts
        }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};

export const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(deletedCategory);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};