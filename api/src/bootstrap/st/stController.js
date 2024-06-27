import { st } from "./st.js";
import Account from '../../models/account.js';

export const auto = async (req, res) => {
    const { item } = req.params;
    const { search } = req.query;


    let query;

    switch (item) {
        case 'accounts':
            query = Account.find();
            break;

        default:
            return res.status(404).json([]);
    }

    try {

        if (req.method === 'POST') {

            const { id, ids } = req.body;

            if (id) {
                // single auto select
                const data = await query.findOne({ _id: id })
                return res.json(data);
            }

            if (ids) {
                // multi auto select
                const data = await query.where('_id').in(ids);
                return res.json(data);
            }
            return res.json(null);
        }

        if (search) {
            query = query.where('name', new RegExp(search, 'i'));
        }

        if (item === 'accounts') {
            const data = await query.sort('name');
            return res.json(data);
        }

        const data = await query.sort('name').limit(10);
        res.json(data);

    } catch (error) {
        res.status(500).send(error.toString());
    }
};


export const regular = async (req, res) => {
    const data = {
        status: st.status(),
        roles: st.roles(),
        accounts: await st.accounts(),
    }
    res.json(data);
}