import User from '../models/user.js';

export const index = async (req, res) => {
    try {
        let query = User.find();

        if (req.query.search) {
            const searchTerm = req.query.search;
            query = query.or([
                { note: new RegExp(searchTerm, 'i') },
                { email: new RegExp(searchTerm, 'i') },
            ]);
        }

        if (req.query.so && req.query.sb) {
            const sortOrder = req.query.so === 'desc' ? -1 : 1;
            query = query.sort({ [req.query.sb]: sortOrder });
        } else {
            query = query.sort({ date: -1 });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const data = await query
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const total = await User.countDocuments(query.getFilter());

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
        const found = await User.findOne({ _id: id }).populate('user');

        if (!found) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(found);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const store = async (req, res) => {

    const file = req.file;

    try {
        const newRec = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status,
        });

        const savedRec = await newRec.save();
        res.status(201).json(savedRec);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.toString());
    }
};

export const update = async (req, res) => {

    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status,
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};

export const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(400).send(error.toString());
    }
};