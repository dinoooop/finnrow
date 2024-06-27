export class stb {

    static propReturn(param = null, data = null) {
        if (data && data[0] && data[0]['_id']) {
            return this.find(param, data)
        } else {
            if (param) {
                if (data && data.length > 0) {
                    const newData = this.setKeyNameId(data)
                    return this.find(param, newData)
                } else {
                    return null;
                }
            }

        }

        return []
    }

    static setKeyNameId(data) {
        return data.map(item => ({
            _id: item,
            key: item,
            name: item.charAt(0).toUpperCase() + item.slice(1)
        }));
    }

    static find(param = null, data = null) {
        if (typeof param === 'number') {
            const index = data.findIndex(item => item._id === param);
            if (index === -1) {
                throw new Error("Index not found");
            }
            return data[index].key;
        } else if (typeof param === 'string') {
            const index = data.findIndex(item => item.key? item.key === param : item.name === param);
            if (index === -1) {
                throw new Error("Index not found");
            }
            return data[index]._id;
        } else {
            return data;
        }
    }

    static localData() {
        return localStorage.getItem('st_data') ? JSON.parse(localStorage.getItem('st_data')) : null;
    }

}
