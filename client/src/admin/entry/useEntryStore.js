import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';  // Assuming you have a config file for API endpoints and headers

const useEntryStore = create((set) => ({
    items: [],
    item: {},
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: '',
    index: async (data = {}) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${config.api}/entries`, {
                params: data,
                headers: config.header().headers,
            });
            set({ items: response.data.data, loading: false, perPage: response.data.per_page, total: response.data.total });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
        }
    },
    show: async (id) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/entries/${id}`, config.header());
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
        }
    },
    store: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/entries`, data, config.header())
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
            throw error;
        }
    },
    update: async (data) => {
        const id = (typeof data._id === 'undefined') ? data.get('_id') : data._id;

        try {
            set({ loading: true, success: '', error: '' });
            const response = await axios.put(`${config.api}/entries/${id}`, data, config.header())
            set({ loading: false, item: response.data })
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
            throw error;
        }

    },
    destroy: async (data) => {
        console.log('data');
        console.log(data);
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.delete(`${config.api}/entries/${data._id}`, config.header())
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
        }
    },
    remove: (data) => set((state) => ({
        items: state.items.filter(item => item._id !== data._id)
    })),
    reset: () => set({
        error: '',
        success: '',
        loading: false
    })
}));

export default useEntryStore;