import { bc } from '../helpers/bc.js';
import Entry from '../models/entry.js';

export const index = async (req, res) => {
  try {
    let query = Entry.find({ user: req.userId });

    if (req.query.search) {

      const searchTerm = req.query.search;
      const numberSearch = !isNaN(searchTerm) ? Number(searchTerm) : null;

      query.or([
        { note: new RegExp(searchTerm, 'i') },
        ...(numberSearch !== null ? [{ price: numberSearch }] : [])
      ]);
    }

    if (req.query.account) {
      query.and({ account: req.query.account });
    }



    if (req.query.year && req.query.month) {
      const { start, end } = bc.getYMSE(req.query.year, req.query.month)
      query.and({
        date: {
          $gte: start,
          $lte: end
        }
      });
    } else if (req.query.year) {
      const { start, end } = bc.getYMSE(req.query.year)
      query.and({
        date: {
          $gte: start,
          $lte: end
        }
      });
    }

    if (req.query.so && req.query.sb) {
      const sortOrder = req.query.so === 'desc' ? -1 : 1;
      query.sort({ [req.query.sb]: sortOrder });
    } else {
      query.sort({ date: -1 });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await query
      .populate('account')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await Entry.countDocuments(query.getFilter());

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
    const entry = await Entry.findOne({ _id: id }).populate('user')

    if (!entry) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const store = async (req, res) => {

  const file = req.file;

  try {
    const newEntry = new Entry({
      date: req.body.date,
      account: req.body.account,
      note: req.body.note,
      price: req.body.price,
      user: req.userId,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, {
      date: req.body.date,
      account: req.body.account,
      note: req.body.note,
      price: req.body.price,
      user: req.userId,
    }, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).send(error.toString());
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(deletedEntry);
  } catch (error) {
    res.status(400).send(error.toString());
  }
};