import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const useUserStore = create((set) => ({
    items: [],
    item: {},
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: '',

    // Async action to fetch user data
    index: async (data = {}) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${config.api}/users`, {
                params: data,
                headers: config.header().headers,
            });
            set({ 
                loading: false, 
                items: response.data.data, 
                perPage: response.data.per_page, 
                total: response.data.total 
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message?? 'Server error',
                success: '',
            });
        }
    },
    show: async (id) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/users/${id}`, config.header());
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message?? 'Server error',
                success: '',
            });
        }
    },
    store: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/users`, data, config.header())
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message?? 'Server error',
                success: '',
            });
            throw error;
        }
    },
    update: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.put(`${config.api}/users/${data.id}`, data, config.header())
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message?? 'Server error',
                success: '',
            });
        }
    },
    destroy: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.delete(`${config.api}/users/${data.id}`, config.header())
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response.data.message?? 'Server error',
                success: '',
            });
        }
    },
    remove: (data) => set((state) => ({
        items: state.items.filter(item => item.id !== data.id)
    })),
    reset: () => set({
        error: '',
        success: '',
        loading: false
    })
}));

export default useUserStore;
