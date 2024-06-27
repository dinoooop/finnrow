import Account from '../../models/account.js';

export class sta {

    static status(context = null) {
        switch (context) {
            case 'user':
                return [
                    'active',
                    'suspended',
                    'pending' // user not verified email
                ];

            default:
                return ['active', 'suspended'];

        }
    }

    static roles() {
        return ['admin', 'user']
    }

    static async accounts() {
        return  await Account.find();
    }

}